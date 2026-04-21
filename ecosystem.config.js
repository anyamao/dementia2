module.exports = {
  apps: [
    {
      name: "dementia-frontend",
      // Use node to run Next.js CLI directly (avoids shell script issues)
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 3003",
      cwd: "/home/vika/dementia2/frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        NEXT_PUBLIC_API_URL: "https://dementia.yourdomain.com"
      },
      instances: 1,
      exec_mode: "fork",
      merge_logs: true
    },
    {
      name: "dementia-backend",
      script: "/home/vika/dementia2/backend/venv/bin/python",
      args: "-m uvicorn main:app --host 0.0.0.0 --port 8003 --workers 4",
      cwd: "/home/vika/dementia2/backend",
      env: {
        PYTHONUNBUFFERED: "1",
        PYTHONPATH: "/home/vika/dementia2/backend",
        DATABASE_URL: "sqlite:///./users.db"  // Fallback for PM2 env
      },
      interpreter: "none",
      merge_logs: true
    }
  ]
};
