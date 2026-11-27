"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code2, Key, Server, ArrowRight, ExternalLink } from "lucide-react";

export default function APIPage() {
  const backendDocsUrl =
    process.env.NEXT_PUBLIC_BACKEND_DOCS_URL ||
    `${(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "https://api.xether.ai").replace(/\/api\/v1\/?$/, "").replace(/\/$/, "")}/docs`;
  const ragDocsUrl =
    process.env.NEXT_PUBLIC_RAG_DOCS_URL || "https://rag.xether.ai/docs";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "/dashboard";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                API Reference
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              RESTful APIs for data processing and document intelligence.
              OpenAPI documentation included.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-card/50 px-6 py-24">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">Services</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Two powerful services, one unified platform
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>AI Backend</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        Port 8000
                      </span>
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Data processing, pipeline execution, job monitoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/datasets</code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/pipelines</code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/jobs</code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/reports</code>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={backendDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Documentation
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>RAG Service</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        Port 8001
                      </span>
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Document indexing, semantic search, AI-powered Q&A.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/documents</code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">/api/v1/queries</code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">
                      /api/v1/collections
                    </code>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm font-mono">
                      /api/v1/embeddings
                    </code>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={ragDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Documentation
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="border-t border-border bg-background px-6 py-24">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Key className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Authentication
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              JWT-based authentication. Include token in Authorization header.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Login Endpoint</CardTitle>
                <CardDescription>Get your access token</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-6 text-sm">
                  {`POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "user",
  "password": "password"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}`}
                </pre>
                <p className="mt-4 text-sm text-muted-foreground">
                  Use the access token in subsequent requests:
                </p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  {`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Endpoints */}
      <section className="border-t border-border bg-card/50 px-6 py-24">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Common Endpoints
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Essential API endpoints for data processing and document search
            </p>
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Dataset</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-6 text-sm">
                  {`POST /api/v1/datasets/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: data.csv

Response:
{
  "id": 1,
  "name": "data.csv",
  "status": "uploaded",
  "file_size": 1024000
}`}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Execute Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-6 text-sm">
                  {`POST /api/v1/pipelines/execute
Content-Type: application/json
Authorization: Bearer <token>

{
  "dataset_id": 1,
  "steps": ["remove_duplicates", "handle_missing"]
}

Response:
{
  "job_id": 1,
  "status": "processing"
}`}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Query Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-6 text-sm">
                  {`POST /api/v1/queries
Content-Type: application/json
Authorization: Bearer <token>

{
  "query": "What are the main findings?",
  "collection_id": 1
}

Response:
{
  "answer": "The main findings indicate...",
  "sources": [
    {
      "document": "document.pdf",
      "page": 5,
      "relevance": 0.95
    }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 px-6 py-24">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Integrate?
            </h2>
            <p className="mb-10 text-xl text-muted-foreground">
              Start building with our comprehensive API documentation.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a
                  href={backendDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View API Docs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href={appUrl}>
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
