#!/bin/bash
kubectl -n $KUBE_NAMESPACE set image deployment/bookbnb-frontend frontend=$IMAGE_NAME:$IMAGE_VERSION
