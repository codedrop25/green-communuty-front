module.exports = {
  apps: [
    {
      name: 'green-community-front',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3200',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: false,
      max_memory_restart: '1G',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
    },
  ],
};
