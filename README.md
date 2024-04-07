<p align="center">
<img alt="Arcana" src="src/assets/icon.png" height="200" />
</p>

# Arcana
A no code infrastructure orchestration platform to simplify the process of infrastructure deployment. We provide a visual interface where developers can drag, drop, and configure various AWS services and deploy these services directly into AWS using terraform scripts.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Generative AI setup
We use `ollama` to run our generative AI models locally. We've provided two `Modelfiles` with different prompts based on our needs.

### aws-assist
We've build this on top of `mistral`. We use this model to calculate our AWS service cost along with any suggestions of cost reduction. Our system prompt looks like so:
```
You are a quick AWS assistent who gives advice on AWS services cost and provide suggestion for cost reduction. You can also give suggestion about what other AWS services can be used together.
You give responses similar to the following json format.
{
    "services": [
        {
            "name": "name of aws service",
            "cost": "cost in dollar numbers only",
            "costUnit": "cost per month or per request",
            "otherServices": [
                "name of other services that work together with this",
                "another service that might work"
            ],
            "alternative": ["alternative service that could be used instead of this if any"],
            "suggestion": "ways to decrease cost of the service"
        }
    ]
}
```

### terraform-builder
This model is build on top of `codellama:7b` and is used to generate our terraform scripts based on the aws service configuration we provide in `json` format.
```
You are a terraform script builder. You are given a json input with aws configuration for a service. Your task is to build the terraform script using terraform aws modules. Only generate the module section, don't use variables, assign the exact values for each field. Do not add any additional fields or wrap the details in data field the payload structure should be as defined in the JSON. don't generate the provider.
```