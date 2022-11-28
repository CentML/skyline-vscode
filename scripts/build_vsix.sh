#!/bin/bash

# Build react UI
pushd skyline-vscode/react-ui && \
    npm install --legacy-peer-deps && \
    CI=false npm run build && \
    popd;

# Build backend
# TODO: Replace "npm install react" with a proper fix in package.json
pushd skyline-vscode && \
    npm install --legacy-peer-deps  && \
    pushd src/protobuf && 
    make && make old && \
    popd && \
    npm install react react-dom && \
    yes | vsce package && \
    popd;

