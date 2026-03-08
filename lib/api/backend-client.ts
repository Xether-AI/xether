/**
 * Backend API Client for Xether AI
 * 
 * Provides typed methods for interacting with the Main Backend API.
 * Uses TanStack Query for data fetching and caching.
 */

const API_BASE_URL = process.env.XETHER_BACKEND_API_BASE_URL || 'http://localhost:8000';

interface ApiError {
  error: {
    message: string;
    code: string;
    details?: unknown;
    request_id?: string;
  };
}

class BackendApiError extends Error {
  code: string;
  details?: unknown;
  requestId?: string;

  constructor(error: ApiError['error']) {
    super(error.message);
    this.name = 'BackendApiError';
    this.code = error.code;
    this.details = error.details;
    this.requestId = error.request_id;
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function backendFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new BackendApiError(error.error);
  }

  return response.json();
}

/**
 * Authenticated fetch wrapper
 */
async function authenticatedFetch<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  return backendFetch<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
}

// Types
export interface Pipeline {
  id: number;
  name: string;
  description?: string;
  project_id: number;
  config: Record<string, unknown>;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface PipelineExecution {
  id: string;
  pipeline_id: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress?: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface Dataset {
  id: number;
  name: string;
  description?: string;
  project_id: number;
  storage_path: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DatasetVersion {
  id: number;
  dataset_id: number;
  version: string;
  storage_path: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  team_id: number;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface Artifact {
  id: string;
  name: string;
  bucket: string;
  key: string;
  size: number;
  content_type: string;
  checksum_sha256: string;
  version_id?: string;
  pipeline_id?: string;
  execution_id?: string;
  project_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UploadURLRequest {
  name: string;
  bucket: string;
  key: string;
  content_type: string;
  expires_in_seconds?: number;
  pipeline_id?: string;
  execution_id?: string;
  project_id?: string;
}

export interface UploadURLResponse {
  artifact_id: string;
  upload_url: string;
}

/**
 * Backend API Client
 */
export const backendApi = {
  // Pipelines
  async getPipelines(token: string): Promise<Pipeline[]> {
    return authenticatedFetch('/api/v1/pipelines', token);
  },

  async getPipeline(token: string, id: number): Promise<Pipeline> {
    return authenticatedFetch(`/api/v1/pipelines/${id}`, token);
  },

  async createPipeline(token: string, data: Partial<Pipeline>): Promise<Pipeline> {
    return authenticatedFetch('/api/v1/pipelines', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async executePipeline(token: string, id: number): Promise<PipelineExecution> {
    return authenticatedFetch(`/api/v1/pipelines/${id}/execute`, token, {
      method: 'POST',
    });
  },

  async getPipelineExecutions(token: string, pipelineId: number): Promise<PipelineExecution[]> {
    return authenticatedFetch(`/api/v1/pipelines/${pipelineId}/executions`, token);
  },

  async getExecution(token: string, id: string): Promise<PipelineExecution> {
    return authenticatedFetch(`/api/v1/executions/${id}`, token);
  },

  // Datasets
  async getDatasets(token: string, projectId?: number): Promise<Dataset[]> {
    const query = projectId ? `?project_id=${projectId}` : '';
    return authenticatedFetch(`/api/v1/datasets${query}`, token);
  },

  async getDataset(token: string, id: number): Promise<Dataset> {
    return authenticatedFetch(`/api/v1/datasets/${id}`, token);
  },

  async createDataset(token: string, data: Partial<Dataset>): Promise<Dataset> {
    return authenticatedFetch('/api/v1/datasets', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getDatasetVersions(token: string, datasetId: number): Promise<DatasetVersion[]> {
    return authenticatedFetch(`/api/v1/datasets/${datasetId}/versions`, token);
  },

  // Projects
  async getProjects(token: string): Promise<Project[]> {
    return authenticatedFetch('/api/v1/projects', token);
  },

  async getProject(token: string, id: number): Promise<Project> {
    return authenticatedFetch(`/api/v1/projects/${id}`, token);
  },

  async createProject(token: string, data: Partial<Project>): Promise<Project> {
    return authenticatedFetch('/api/v1/projects', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Teams
  async getTeams(token: string): Promise<Team[]> {
    return authenticatedFetch('/api/v1/teams', token);
  },

  async getTeam(token: string, id: number): Promise<Team> {
    return authenticatedFetch(`/api/v1/teams/${id}`, token);
  },

  // Artifacts
  async requestUploadURL(token: string, request: UploadURLRequest): Promise<UploadURLResponse> {
    return authenticatedFetch('/api/v1/artifacts/upload', token, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async completeUpload(
    token: string,
    artifactId: string,
    data: { size: number; checksum: string; version_id?: string }
  ): Promise<{ status: string; artifact_id: string }> {
    return authenticatedFetch(`/api/v1/artifacts/${artifactId}/complete`, token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getDownloadURL(token: string, artifactId: string): Promise<{ download_url: string }> {
    return authenticatedFetch(`/api/v1/artifacts/${artifactId}/download`, token);
  },

  async getArtifact(token: string, artifactId: string): Promise<Artifact> {
    return authenticatedFetch(`/api/v1/artifacts/${artifactId}`, token);
  },

  async listArtifacts(
    token: string,
    filters?: { project_id?: string; pipeline_id?: string }
  ): Promise<Artifact[]> {
    const params = new URLSearchParams();
    if (filters?.project_id) params.append('project_id', filters.project_id);
    if (filters?.pipeline_id) params.append('pipeline_id', filters.pipeline_id);

    const query = params.toString() ? `?${params.toString()}` : '';
    return authenticatedFetch(`/api/v1/artifacts${query}`, token);
  },

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return backendFetch('/health');
  },
};

export { BackendApiError };
export type { ApiError };
