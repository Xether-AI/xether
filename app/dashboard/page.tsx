/**
 * Dashboard Page - Example of Backend API Integration
 * 
 * This page demonstrates how to use the Backend API hooks
 * to fetch and display data from the Xether AI platform.
 */

'use client';

import { usePipelines, useDatasets, useProjects, useHealthCheck } from '@/hooks/useBackendApi';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Database, Workflow, FolderKanban } from 'lucide-react';

export default function DashboardPage() {
  const { data: health } = useHealthCheck();
  const { data: pipelines, isLoading: pipelinesLoading, error: pipelinesError } = usePipelines();
  const { data: datasets, isLoading: datasetsLoading, error: datasetsError } = useDatasets();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();

  return (
    <div className="container mx-auto px-6 pb-10 pt-24 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {health && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Backend: {health.status}
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Workflow className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pipelines</p>
              <p className="text-2xl font-bold">
                {pipelinesLoading ? <Skeleton className="h-8 w-12" /> : pipelines?.length || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Datasets</p>
              <p className="text-2xl font-bold">
                {datasetsLoading ? <Skeleton className="h-8 w-12" /> : datasets?.length || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FolderKanban className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="text-2xl font-bold">
                {projectsLoading ? <Skeleton className="h-8 w-12" /> : projects?.length || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Error Alerts */}
      {(pipelinesError || datasetsError || projectsError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading data</AlertTitle>
          <AlertDescription>
            {pipelinesError?.message || datasetsError?.message || projectsError?.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Pipelines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Pipelines</h2>
        {pipelinesLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : pipelines && pipelines.length > 0 ? (
          <div className="grid gap-4">
            {pipelines.slice(0, 5).map((pipeline) => (
              <Card key={pipeline.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{pipeline.name}</h3>
                    <p className="text-sm text-muted-foreground">{pipeline.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {pipeline.status && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pipeline.status === 'completed' ? 'bg-green-100 text-green-800' :
                        pipeline.status === 'running' ? 'bg-blue-100 text-blue-800' :
                        pipeline.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {pipeline.status}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No pipelines found. Create your first pipeline to get started.</p>
          </Card>
        )}
      </div>

      {/* Recent Datasets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Datasets</h2>
        {datasetsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : datasets && datasets.length > 0 ? (
          <div className="grid gap-4">
            {datasets.slice(0, 5).map((dataset) => (
              <Card key={dataset.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{dataset.name}</h3>
                    <p className="text-sm text-muted-foreground">{dataset.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{dataset.storage_path}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(dataset.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No datasets found. Upload your first dataset to get started.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
