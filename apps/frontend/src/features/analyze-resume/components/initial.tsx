import { TrendingUp } from "lucide-react";

export const Initial = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="size-12 bg-foreground rounded-full flex items-center justify-center">
        <TrendingUp className="size-6 text-background" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Ready to analyze your resume?</h2>
        <p className="text-muted-foreground max-w-md">
          Upload your resume and job description to get AI-powered insights on how well you match the position.
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="size-2 bg-primary rounded-full"></div>
        <span>Upload documents in the sidebar to begin</span>
      </div>
    </div>
  );
};
