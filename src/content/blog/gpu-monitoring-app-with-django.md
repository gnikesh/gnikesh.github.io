---
title: 'GPU Monitoring app with Django'
description: 'A tiny GPU monitoring web app built with Django and gpustat that shows real-time GPU usage, memory, and active processes per user - handy in shared research labs and clusters.'
pubDate: 2025-04-13
tags: ['Computer', 'Programming']
cover: '/images/blog/gpu-monitoring/ui.png'
coverAlt: 'Screenshot of the GPU monitoring web app interface'
---

Ever wished for a simple, clean way to monitor your GPU usage without diving into terminal commands or heavy dashboards? I recently built a **tiny GPU monitoring web app** that does exactly that - lightweight, easy to deploy, and super useful if you're running GPU workloads.

**A screenshot of the UI:**

![GPU monitoring app interface](/images/blog/gpu-monitoring/ui.png)

## Details of the app

This project is a **minimal GPU monitoring tool** built using:

- **Django** - a reliable and robust Python web framework
- **gpustat** - a Python library that provides detailed GPU stats like usage, memory, and active processes

The app gives you a web interface that displays real-time GPU info, including:

- Which GPUs are currently active
- Which users are running GPU-intensive processes
- How much GPU memory is being used by each user

It's especially handy in shared environments like research labs or server clusters where multiple users run jobs on the same machine.

## Features

- Real-time monitoring of GPU usage and memory stats
- Lists per-user processes using the GPU
- Easy-to-use web interface
- Lightweight and fast to deploy
- Built on Django - customize or extend as needed

## Check It Out

You can find the full source code and setup instructions here: **[https://github.com/gnikesh/gpu-monitor](https://github.com/gnikesh/gpu-monitor)**

Feel free to check it out, test it, and share any feedback or ideas for improvement. Contributions are always welcome!
