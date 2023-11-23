# Walmart Home Assignment
## Introduction
This repository contains the Kubernetes and Pulumi configurations for the Walmart Home Assignment project. The project showcases deployment and management of cloud infrastructure using Pulumi and orchestrating services with Kubernetes.

## Prerequisites
Before you begin, ensure you have the following installed:

* A Kubernetes cluster (Minikube, EKS, GKE, etc.)
* Pulumi for infrastructure as code
* Docker for containerization
* Git for cloning the repository
* Access to the internet for pulling images and Pulumi packages


## Installation & Configuration
### Step 1: Clone the Repository
Clone the repository to your local machine:
```
git clone https://github.com/YonatanGolick/walmart-home-assignment.git
cd walmart-home-assignment
```
### Step 2: Set Up Kubernetes Cluster
Set up a Kubernetes cluster if you haven't already. Ensure that kubectl is configured to interact with your cluster:
```
kubectl config current-context
```
### Step 3: Install and Configure Pulumi
Install Pulumi from Pulumi's official documentation.
Log in to Pulumi:
```
pulumi login
```
Select the appropriate Pulumi stack:
```
pulumi stack select dev
```
### Step 4: Deploying the Application
Deploy your application using Pulumi. This will set up the necessary infrastructure on your Kubernetes cluster:
```
pulumi up
```
Follow the prompts to complete the deployment.
### Step 5: Verify the Deployment
Verify that the deployment is successful:
List all Kubernetes resources to ensure they are correctly deployed:
```
kubectl get all --all-namespaces
```
Access the application (if applicable) via the appropriate URL or IP address.
## Usage
For a post api request plaese run:
```
curl -X POST http://<IP>:<port>/ -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}'
```
For get api request please run with the identifier you got from the post request:
```
http://<IP>:<port>/<identifier>
```
