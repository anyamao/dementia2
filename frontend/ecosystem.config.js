// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "dementia-frontend",
      script: "pnpm",
      args: "start",
      cwd: "./frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        NEXT_PUBLIC_API_URL: "https://api.dementia.острыйум.рф"
      },
      instances: 1,
      exec_mode: "fork",
      log_file: "./logs/frontend.log",
      error_file: "./logs/frontend-error.log",
      merge_logs: true,
      restart_delay: 4000,
    },
    {
      name: "dementia-backend",
      script: "gunicorn",
      args: "main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8003 --access-logfile ./logs/backend-access.log --error-logfile ./logs/backend-error.log",
      cwd: "./backend",
      env: {
        PYTHON_ENV: "production",
        PATH: "./backend/venv/bin:$PATH",
      },
      interpreter: "python3",
      log_file: "./logs/backend.log",
      error_file: "./logs/backend-error.log",
      merge_logs: true,
      restart_delay: 4000,
    }
  ]
};
