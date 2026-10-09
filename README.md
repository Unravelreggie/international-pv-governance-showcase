# International PV · Data governance — synthetic public showcase

A fictional country-product governance workspace covering approval evidence, agreement signature status, responsibility assignment and follow-up. Its role filters are display-only and do not implement production RBAC.

This public repository contains **independently written demonstration code and entirely fabricated fixtures**. It is not a sanitized copy of a production system. No private Git history, company implementation, operational records, real study results, licensed terminology/templates, screenshots, secrets or infrastructure configuration are included.

## Run locally

Requires Node.js 22.13 or later.

```sh
npm ci
npm test
npm run build
npm run dev
```

The development server binds to local loopback. The application makes no runtime network requests, has no accounts and accepts no uploaded files. It is independently buildable and has no dependency on another project or data directory.

## What to explore

- Country-product scope
- Agreement evidence
- Responsibility map
- Follow-up review

English and Chinese interfaces are provided. Every displayed example and calculated demo value is synthetic. Browser actions do not create real review records or provide production authorization.

See [architecture](docs/ARCHITECTURE.md), [data/publication boundary](docs/PUBLIC_SCOPE.md), and [methodology](docs/METHODS.md).

## 中文说明

International PV · 数据治理的独立公开演示。所有示例均为重新编写的合成资料，用于展示功能、流程和方法；没有真实业务数据、结果或公司源代码。界面复核、过滤、导出与统计数值仅为演示，不能作为真实审计、监管或临床结论。

## Publication

This repository is a public code showcase. No website hosting, production deployment, public tunnel or external integration is configured. The private operational projects remain separate.
