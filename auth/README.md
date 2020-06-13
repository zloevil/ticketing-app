###Add new secret cmd:
Add nginx-ingress for local development (MAC OS):
```shell script
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml
```
Add JWT_SECRET:
```shell script
kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=zloject
```
Add COOKIE_SECRET:
```shell script
kubectl create secret generic cookie-secret --from-literal=COOKIE_SECRET=zl0ject
```
