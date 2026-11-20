/**
 * React hooks for Backend API integration using TanStack Query
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backendApi, type Pipeline, type Dataset, type Project } from '@/lib/api/backend-client';

// Helper to get auth token (you'll need to implement this based on your auth system)
function useAuthToken(): string | null {
  // TODO: Implement based on your auth system
  // For now, return null - you'll need to integrate with your auth
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Pipelines
export function usePipelines() {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['pipelines'],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getPipelines(token);
    },
    enabled: !!token,
  });
}

export function usePipeline(id: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['pipeline', id],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getPipeline(token, id);
    },
    enabled: !!token && !!id,
  });
}

export function useCreatePipeline() {
  const queryClient = useQueryClient();
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: (data: Partial<Pipeline>) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.createPipeline(token, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] });
    },
  });
}

export function useExecutePipeline() {
  const queryClient = useQueryClient();
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: (pipelineId: number) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.executePipeline(token, pipelineId);
    },
    onSuccess: (_, pipelineId) => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', pipelineId] });
      queryClient.invalidateQueries({ queryKey: ['executions', pipelineId] });
    },
  });
}

export function usePipelineExecutions(pipelineId: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['executions', pipelineId],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getPipelineExecutions(token, pipelineId);
    },
    enabled: !!token && !!pipelineId,
    refetchInterval: 5000, // Poll every 5 seconds for execution updates
  });
}

// Datasets
export function useDatasets(projectId?: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['datasets', projectId],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getDatasets(token, projectId);
    },
    enabled: !!token,
  });
}

export function useDataset(id: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getDataset(token, id);
    },
    enabled: !!token && !!id,
  });
}

export function useCreateDataset() {
  const queryClient = useQueryClient();
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: (data: Partial<Dataset>) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.createDataset(token, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });
}

export function useDatasetVersions(datasetId: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['dataset-versions', datasetId],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getDatasetVersions(token, datasetId);
    },
    enabled: !!token && !!datasetId,
  });
}

// Projects
export function useProjects() {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getProjects(token);
    },
    enabled: !!token,
  });
}

export function useProject(id: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getProject(token, id);
    },
    enabled: !!token && !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: (data: Partial<Project>) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.createProject(token, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Teams
export function useTeams() {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getTeams(token);
    },
    enabled: !!token,
  });
}

export function useTeam(id: number) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getTeam(token, id);
    },
    enabled: !!token && !!id,
  });
}

// Artifacts
export function useArtifacts(filters?: { project_id?: string; pipeline_id?: string }) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['artifacts', filters],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.listArtifacts(token, filters);
    },
    enabled: !!token,
  });
}

export function useArtifact(artifactId: string) {
  const token = useAuthToken();
  
  return useQuery({
    queryKey: ['artifact', artifactId],
    queryFn: () => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.getArtifact(token, artifactId);
    },
    enabled: !!token && !!artifactId,
  });
}

export function useRequestUploadURL() {
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: (request: Parameters<typeof backendApi.requestUploadURL>[1]) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.requestUploadURL(token, request);
    },
  });
}

export function useCompleteUpload() {
  const queryClient = useQueryClient();
  const token = useAuthToken();
  
  return useMutation({
    mutationFn: ({ artifactId, data }: {
      artifactId: string;
      data: Parameters<typeof backendApi.completeUpload>[2];
    }) => {
      if (!token) throw new Error('Not authenticated');
      return backendApi.completeUpload(token, artifactId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artifacts'] });
    },
  });
}

// Health check
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => backendApi.healthCheck(),
    refetchInterval: 30000, // Check every 30 seconds
  });
}
