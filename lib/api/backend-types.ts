export interface Pipeline {
  id: number
  name: string
  description?: string
  project_id: number
  config: Record<string, unknown>
  status?: string
  created_at: string
  updated_at: string
}

export interface PipelineExecution {
  id: string
  pipeline_id: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress?: number
  error_message?: string
  started_at?: string
  completed_at?: string
  created_at: string
}

export interface Dataset {
  id: number
  name: string
  description?: string
  project_id: number
  storage_path: string
  metadata?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface DatasetVersion {
  id: number
  dataset_id: number
  version: string
  storage_path: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface Project {
  id: number
  name: string
  description?: string
  team_id: number
  created_at: string
  updated_at: string
}

export interface Team {
  id: number
  name: string
  description?: string
  owner_id: number
  created_at: string
  updated_at: string
}

export interface Artifact {
  id: string
  name: string
  bucket: string
  key: string
  size: number
  content_type: string
  checksum_sha256: string
  version_id?: string
  pipeline_id?: string
  execution_id?: string
  project_id?: string
  created_at: string
  updated_at: string
}

export interface UploadURLRequest {
  name: string
  bucket: string
  key: string
  content_type: string
  expires_in_seconds?: number
  pipeline_id?: string
  execution_id?: string
  project_id?: string
}

export interface UploadURLResponse {
  artifact_id: string
  upload_url: string
}
