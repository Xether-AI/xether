import type {
  Artifact,
  Dataset,
  DatasetVersion,
  Pipeline,
  PipelineExecution,
  Project,
  Team,
  UploadURLRequest,
  UploadURLResponse,
} from '@/lib/api/backend-types'

const API_BASE_URL = '/api/backend'

type BackendErrorBody = {
  error?: string | { message?: string; code?: string; details?: unknown }
}

export class BackendApiError extends Error {
  code: string
  details?: unknown

  constructor(message: string, code = 'BACKEND_ERROR', details?: unknown) {
    super(message)
    this.name = 'BackendApiError'
    this.code = code
    this.details = details
  }
}

async function backendFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
  })

  const contentType = response.headers.get('content-type') ?? ''
  const data: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null)

  if (!response.ok) {
    const body = data && typeof data === 'object' ? (data as BackendErrorBody) : null
    const error = body?.error
    if (typeof error === 'object' && error) {
      throw new BackendApiError(
        error.message || `Request failed with status ${response.status}`,
        error.code || `HTTP_${response.status}`,
        error.details,
      )
    }
    throw new BackendApiError(
      typeof error === 'string' ? error : `Request failed with status ${response.status}`,
      `HTTP_${response.status}`,
      data,
    )
  }

  return data as T
}

function post<T>(endpoint: string, data?: unknown): Promise<T> {
  return backendFetch<T>(endpoint, {
    method: 'POST',
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  })
}

export type { Artifact, Dataset, DatasetVersion, Pipeline, PipelineExecution, Project, Team, UploadURLRequest, UploadURLResponse }

export const backendApi = {
  getPipelines: (_token?: string) => backendFetch<Pipeline[]>('/api/v1/pipelines'),
  getPipeline: (_token: string | undefined, id: number) => backendFetch<Pipeline>(`/api/v1/pipelines/${id}`),
  createPipeline: (_token: string | undefined, data: Partial<Pipeline>) => post<Pipeline>('/api/v1/pipelines', data),
  executePipeline: (_token: string | undefined, id: number) => post<PipelineExecution>(`/api/v1/pipelines/${id}/execute`),
  getPipelineExecutions: (_token: string | undefined, id: number) => backendFetch<PipelineExecution[]>(`/api/v1/pipelines/${id}/executions`),
  getExecution: (_token: string | undefined, id: string) => backendFetch<PipelineExecution>(`/api/v1/executions/${encodeURIComponent(id)}`),
  getDatasets: (_token: string | undefined, projectId?: number) => backendFetch<Dataset[]>(`/api/v1/datasets${projectId === undefined ? '' : `?project_id=${encodeURIComponent(String(projectId))}`}`),
  getDataset: (_token: string | undefined, id: number) => backendFetch<Dataset>(`/api/v1/datasets/${id}`),
  createDataset: (_token: string | undefined, data: Partial<Dataset>) => post<Dataset>('/api/v1/datasets', data),
  getDatasetVersions: (_token: string | undefined, id: number) => backendFetch<DatasetVersion[]>(`/api/v1/datasets/${id}/versions`),
  getProjects: (_token?: string) => backendFetch<Project[]>('/api/v1/projects'),
  getProject: (_token: string | undefined, id: number) => backendFetch<Project>(`/api/v1/projects/${id}`),
  createProject: (_token: string | undefined, data: Partial<Project>) => post<Project>('/api/v1/projects', data),
  getTeams: (_token?: string) => backendFetch<Team[]>('/api/v1/teams'),
  getTeam: (_token: string | undefined, id: number) => backendFetch<Team>(`/api/v1/teams/${id}`),
  requestUploadURL: (_token: string | undefined, request: UploadURLRequest) => post<UploadURLResponse>('/api/v1/artifacts/upload', request),
  completeUpload: (_token: string | undefined, artifactId: string, data: { size: number; checksum: string; version_id?: string }) => post<{ status: string; artifact_id: string }>(`/api/v1/artifacts/${encodeURIComponent(artifactId)}/complete`, data),
  getDownloadURL: (_token: string | undefined, artifactId: string) => backendFetch<{ download_url: string }>(`/api/v1/artifacts/${encodeURIComponent(artifactId)}/download`),
  getArtifact: (_token: string | undefined, artifactId: string) => backendFetch<Artifact>(`/api/v1/artifacts/${encodeURIComponent(artifactId)}`),
  listArtifacts: (_token: string | undefined, filters?: { project_id?: string; pipeline_id?: string }) => {
    const params = new URLSearchParams()
    if (filters?.project_id) params.set('project_id', filters.project_id)
    if (filters?.pipeline_id) params.set('pipeline_id', filters.pipeline_id)
    const query = params.size ? `?${params.toString()}` : ''
    return backendFetch<Artifact[]>(`/api/v1/artifacts${query}`)
  },
  healthCheck: () => backendFetch<{ status: string }>('/health'),
}
