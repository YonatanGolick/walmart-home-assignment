import * as k8s from "@pulumi/kubernetes";

// MongoDB Deployment
const mongoDeployment = new k8s.apps.v1.Deployment("mongo", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: "mongo" },
    spec: {
        replicas: 1,
        selector: { matchLabels: { app: "mongo" } },
        template: {
            metadata: { labels: { app: "mongo" } },
            spec: {
                containers: [{
                    name: "mongo",
                    image: "mongo",
                    ports: [{ containerPort: 27017 }],
                    volumeMounts: [{ name: "mongo-storage", mountPath: "/data/db" }]
                }],
                volumes: [{
                    name: "mongo-storage",
                    persistentVolumeClaim: { claimName: "mongo-pvc" }
                }]
            }
        }
    }
});

// MongoDB PersistentVolumeClaim
const mongoPVC = new k8s.core.v1.PersistentVolumeClaim("mongo-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: { name: "mongo-pvc" },
    spec: {
        storageClassName: "manual",
        accessModes: ["ReadWriteOnce"],
        resources: { requests: { storage: "1Gi" } }
    }
});

// MongoDB PersistentVolume
const mongoPV = new k8s.core.v1.PersistentVolume("mongo-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: "mongo-pv", labels: { type: "local" } },
    spec: {
        storageClassName: "manual",
        capacity: { storage: "1Gi" },
        accessModes: ["ReadWriteOnce"],
        hostPath: { path: "/data/mongo" }
    }
});

// Application Deployment
const appDeployment = new k8s.apps.v1.Deployment("my-app", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: "my-app" },
    spec: {
        replicas: 1,
        selector: { matchLabels: { app: "my-app" } },
        template: {
            metadata: { labels: { app: "my-app" } },
            spec: {
                containers: [{
                    name: "my-app",
                    image: "yonatan96/walmart-home-assignment:latest",
                    ports: [{ containerPort: 3000 }],
                    env: [
                        {
                            name: "PORT",
                            valueFrom: {
                                configMapKeyRef: { name: "app-config", key: "PORT" }
                            }
                        },
                        {
                            name: "MONGO_CONNECTION_URL",
                            valueFrom: {
                                secretKeyRef: { name: "app-secret", key: "MONGO_CONNECTION_URL" }
                            }
                        }
                    ]
                }]
            }
        }
    }
});

// Application Secret
const appSecret = new k8s.core.v1.Secret("app-secret", {
    apiVersion: "v1",
    kind: "Secret",
    metadata: { name: "app-secret" },
    data: { "MONGO_CONNECTION_URL": "bW9uZ29kYjovL21vbmdvOjI3MDE3L3lvdXJEYXRhYmFzZQ==" }
});

// Application ConfigMap
const appConfigMap = new k8s.core.v1.ConfigMap("app-config", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: { name: "app-config" },
    data: { "PORT": "3000" }
});

// Application Service
const appService = new k8s.core.v1.Service("my-app", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: "my-app" },
    spec: {
        type: "NodePort",
        selector: { app: "my-app" },
        ports: [{ port: 3000, targetPort: 3000, nodePort: 31515 }]
        
    }
});

// MongoDB Service
const mongoService = new k8s.core.v1.Service("mongo", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: "mongo" },
    spec: {
        selector: { app: "mongo" },
        ports: [{ protocol: "TCP", port: 27017, targetPort: 27017 }]
    }
});
