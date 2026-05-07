# Automation Context — n8n + AWS Bedrock + APIs
> For Claude Code: read this when working on automation, APIs, or workflows
> Last updated: 2026-05-08

## AWS Bedrock
- **Region:** us-east-1
- **Model:** anthropic.claude-sonnet-4-6 (cross-region inference)
- **Status:** Access granted, Playground tested ✅
- **Credits:** $20 claimed (Bedrock task). ~$80 remaining from Explore AWS program
- **AWS CLI:** NOT yet configured on Mohit's Windows machine — needs `aws configure`

### Bedrock Python snippet (copy-paste ready)
```python
import boto3, json
client = boto3.client("bedrock-runtime", region_name="us-east-1")
response = client.invoke_model(
    modelId="anthropic.claude-sonnet-4-6",
    body=json.dumps({
        "messages": [{"role": "user", "content": "your prompt here"}],
        "max_tokens": 500,
        "anthropic_version": "bedrock-2023-05-31"
    })
)
result = json.loads(response["body"].read())
print(result["content"][0]["text"])
```

### Bedrock Node.js snippet
```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const client = new BedrockRuntimeClient({ region: "us-east-1" });
const command = new InvokeModelCommand({
    modelId: "anthropic.claude-sonnet-4-6",
    body: JSON.stringify({
        messages: [{ role: "user", content: "your prompt here" }],
        max_tokens: 500,
        anthropic_version: "bedrock-2023-05-31"
    })
});
const response = await client.send(command);
```

## n8n
- **Hosted:** Self-hosted on Hostinger
- **Status:** Installed ✅ — ZERO workflows built yet
- **Access:** URL is on Hostinger — check hPanel for exact port

## Planned Workflows (build in this order)

### Workflow 1 — Auto Blog (BUILD FIRST)
```
Trigger: Daily schedule
→ Bedrock: Find trending visa keyword
→ Bedrock: Write SEO blog post
→ Telegram: Send preview to Mohit
→ Wait for approval (✅/❌)
→ If approved: POST to WordPress API
→ Telegram: Send confirmation
```

### Workflow 2 — Lead Alerts
```
Trigger: evisas.in form submission webhook
→ Telegram/WhatsApp: Notify Mohit with lead details
```

### Workflow 3 — Competitor Spy
```
Trigger: Daily schedule
→ HTTP: Scrape competitor Instagram/LinkedIn
→ Compare with last run
→ If new post: Telegram alert with content
```

### Workflow 4 — LinkedIn Posts
```
Trigger: Weekly schedule (Monday)
→ Bedrock: Generate post from visa news
→ Telegram: Send for approval
→ If approved: Post via LinkedIn API
```

### Workflow 5 — Reel Content Pipeline
```
Trigger: On demand or weekly
→ Bedrock: Find trending visa topic
→ Bedrock: Write reel script
→ Telegram: Send for approval
→ If approved: Save to content/reel-scripts/
```

### Workflow 6 — WhatsApp Approval Gateway
```
Pattern used by ALL workflows above:
→ Send WhatsApp message with action summary
→ Wait for "yes" reply
→ Execute action
→ Send completion confirmation
```

## WordPress API (for blog auto-posting)
- **Status:** API key NOT yet generated
- **How to get:** WordPress Admin → Users → Profile → Application Passwords → Generate
- **Endpoint:** `https://evisas.in/wp-json/wp/v2/posts`
- Store key in: `automation/bedrock/config.env` (never commit to GitHub — add to .gitignore)

## Windsor.ai (Analytics)
- **Status:** NOT connected yet
- **Purpose:** Pull Google Ads + Meta Ads + GA4 into one dashboard
- **Connect at:** claude.com/connectors/windsor-ai
- **Do this AFTER:** ad campaigns are running

## Keys & Secrets (NEVER commit these)
- Store all API keys in `.env` files
- Add `.env` to `.gitignore` immediately
- Use n8n credentials store for workflow secrets
