from collections import deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="VectorShift Pipeline API")

LOCAL_DEV_ORIGIN = r"http://(localhost|127\.0\.0\.1):\d+"

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=LOCAL_DEV_ORIGIN,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: list[Node] = Field(default_factory=list)
    edges: list[Edge] = Field(default_factory=list)


class PipelineReport(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def is_dag(pipeline: Pipeline) -> bool:
    """Return True when the graph has no cycles (Kahn's algorithm).

    Repeatedly remove a node that nothing points at. A cycle has no such node,
    so if any node is left unremoved at the end, the graph is not a DAG.
    """
    node_ids = {node.id for node in pipeline.nodes}
    incoming_count = {node_id: 0 for node_id in node_ids}
    outgoing = {node_id: [] for node_id in node_ids}

    for edge in pipeline.edges:
        # Ignore edges pointing at nodes that are not in the payload.
        if edge.source not in node_ids or edge.target not in node_ids:
            continue
        outgoing[edge.source].append(edge.target)
        incoming_count[edge.target] += 1

    ready = deque(
        node_id for node_id, count in incoming_count.items() if count == 0
    )

    removed = 0
    while ready:
        node_id = ready.popleft()
        removed += 1
        for neighbour in outgoing[node_id]:
            incoming_count[neighbour] -= 1
            if incoming_count[neighbour] == 0:
                ready.append(neighbour)

    return removed == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineReport)
def parse_pipeline(pipeline: Pipeline) -> PipelineReport:
    return PipelineReport(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag(pipeline),
    )
