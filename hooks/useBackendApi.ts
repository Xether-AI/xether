/**
 * React hooks for Backend API integration using TanStack Query
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backendApi, type Pipeline, type Dataset, type Project } from '@/lib/api/backend-client';

export function useAuthSession() {
  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async (): Promise<{ authenticated: boolean }> => {
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      if (!res.ok) return { authenticated: false };
      return res.json();
    },
    staleTime: 60_000,
  });
}

function useIsAuthenticated(): boolean {
  const { data } = useAuthSession();
  return Boolean(data?.authenticated);
}

// Pipelines
export function usePipelines() {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['pipelines'],
    queryFn: () => backendApi.getPipelines(''),
    enabled: authenticated,
  });
}

export function usePipeline(id: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['pipeline', id],
    queryFn: () => backendApi.getPipeline('', id),
    enabled: authenticated && !!id,
  });
}

export function useCreatePipeline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Pipeline>) => backendApi.createPipeline('', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] });
    },
  });
}

export function useExecutePipeline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pipelineId: number) => backendApi.executePipeline('', pipelineId),
    onSuccess: (_, pipelineId) => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', pipelineId] });
      queryClient.invalidateQueries({ queryKey: ['executions', pipelineId] });
    },
  });
}

export function usePipelineExecutions(pipelineId: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['executions', pipelineId],
    queryFn: () => backendApi.getPipelineExecutions('', pipelineId),
    enabled: authenticated && !!pipelineId,
    refetchInterval: 5000, // Poll every 5 seconds for execution updates
  });
}

// Datasets
export function useDatasets(projectId?: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['datasets', projectId],
    queryFn: () => backendApi.getDatasets('', projectId),
    enabled: authenticated,
  });
}

export function useDataset(id: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['dataset', id],
    queryFn: () => backendApi.getDataset('', id),
    enabled: authenticated && !!id,
  });
}

export function useCreateDataset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Dataset>) => backendApi.createDataset('', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });
}

export function useDatasetVersions(datasetId: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['dataset-versions', datasetId],
    queryFn: () => backendApi.getDatasetVersions('', datasetId),
    enabled: authenticated && !!datasetId,
  });
}

// Projects
export function useProjects() {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['projects'],
    queryFn: () => backendApi.getProjects(''),
    enabled: authenticated,
  });
}

export function useProject(id: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['project', id],
    queryFn: () => backendApi.getProject('', id),
    enabled: authenticated && !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Project>) => backendApi.createProject('', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Teams
export function useTeams() {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['teams'],
    queryFn: () => backendApi.getTeams(''),
    enabled: authenticated,
  });
}

export function useTeam(id: number) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['team', id],
    queryFn: () => backendApi.getTeam('', id),
    enabled: authenticated && !!id,
  });
}

// Artifacts
export function useArtifacts(filters?: { project_id?: string; pipeline_id?: string }) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['artifacts', filters],
    queryFn: () => backendApi.listArtifacts('', filters),
    enabled: authenticated,
  });
}

export function useArtifact(artifactId: string) {
  const authenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['artifact', artifactId],
    queryFn: () => backendApi.getArtifact('', artifactId),
    enabled: authenticated && !!artifactId,
  });
}

export function useRequestUploadURL() {
  return useMutation({
    mutationFn: (request: Parameters<typeof backendApi.requestUploadURL>[1]) =>
      backendApi.requestUploadURL('', request),
  });
}

export function useCompleteUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ artifactId, data }: {
      artifactId: string;
      data: Parameters<typeof backendApi.completeUpload>[2];
    }) => backendApi.completeUpload('', artifactId, data),
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
