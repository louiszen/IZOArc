
const Fs = require("./Fs");


( async () => {
  let id = process.argv[2].toLowerCase();
  let pipeline = `name: "$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)"
trigger:
- none

resources:
- repo: self


variables:
- name: dockerRegistryServiceConnection
  value: "gammondev ACR connection"
- name: imageRepository
  value: "${id}-web-dev"
- name: tag
  value: "$(Build.BuildNumber)"
- name: vmImageName
  value: "ubuntu-latest" 
- name: dockerfilePath
  value: "**/Dockerfile-dev"
- name: env
  value: $(SourceBranchName)

stages:

- stage: build_${id}_web_stage
  displayName: Build ${id} Web stage
  dependsOn: []

  jobs:
    - job: build_${id}_web_image
      displayName: Build ${id} Web Image
      pool:
        vmImage: $(vmImageName)
      steps:
        - checkout: self  # identifier for your repository resource
          clean: false  # if true, execute \`execute git clean -ffdx && git reset --hard HEAD\` before fetching
          submodules: true # set to "true" for a single level of submodules or "recursive" to get submodules of submodules; defaults to not checking out submodules
        - task: Docker@2
          displayName: Build and push an image to container registry
          inputs:
            command: buildAndPush
            repository: $(imageRepository)
            dockerfile: $(dockerfilePath)
            containerRegistry: $(dockerRegistryServiceConnection)
            tags: |
              $(tag)
              latest`;

  await Fs.writeFile("pipelines/" + id + "-web-azure-pipelines.dev.yml", pipeline);

  let deployment = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${id}-web-dev
  labels:
    app: ${id}webdev
    name: ${id}-web-dev
    kind: deployment
    tier: web
    purpose: dev
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${id}webdev
      name: ${id}-web-dev
      kind: deployment
      tier: web
      purpose: dev
  template:
    metadata:
      labels:
        app: ${id}webdev
        name: ${id}-web-dev
        kind: deployment
        tier: web
        purpose: dev
    spec:
      containers:
      - name: web
        image: gammondev.azurecr.io/${id}-web-dev
        imagePullPolicy: Always
        ports:
        - containerPort: 80`;
  await Fs.writeFile("manifest/dev/" + id + "-web-deployment.dev.yml", deployment);

  let ingress = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubenetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    kubernetes.io/ingress.class: internal
  name: ${id}-web-dev-ingress-internal
  namespace: aat-test
  labels:
    app: ${id}-web-dev
    name: ${id}-web-dev
    kind: ingress
    tier: web
    purpose: dev
    ingress: internal
spec:
  rules:
  - host: "${id}-web-poc.dev.gammonconstruction.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: ${id}-web-dev-svc
            port: 
              number: 80`;
  await Fs.writeFile("manifest/dev/" + id + "-web-ingress.dev.yaml", ingress);

  let service = `apiVersion: v1
kind: Service
metadata:
  name: ${id}-web-dev-svc
  labels:
    app: ${id}webdev
    name: ${id}-web-dev
    kind: service
    tier: web
    purpose: dev
spec:
  selector:
    app: ${id}webdev
    name: ${id}-web-dev
    kind: deployment
    tier: web
    purpose: dev
  ports:
  - port: 80
    targetPort: 80`;
  await Fs.writeFile("manifest/dev/" + id + "-web-service.dev.yml", service);
})();