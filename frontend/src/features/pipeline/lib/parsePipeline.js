const API_BASE_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8000";

const toPayload = (nodes, edges) => ({
  nodes: nodes.map(({ id, type, data }) => ({ id, type, data })),
  edges: edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
  })),
});

export class PipelineRequestError extends Error {}

export const parsePipeline = async (nodes, edges) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(nodes, edges)),
    });
  } catch {
    throw new PipelineRequestError(
      `Could not reach the backend at ${API_BASE_URL}. Start it with: uvicorn main:app --reload --port 8000`,
    );
  }

  if (!response.ok) {
    throw new PipelineRequestError(
      `The backend rejected the pipeline (HTTP ${response.status}).`,
    );
  }

  return response.json();
};
