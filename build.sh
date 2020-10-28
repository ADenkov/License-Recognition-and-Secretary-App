#!/bin/sh
cd $TRAVIS_BUILD_DIR/PAAS
sbt ++$TRAVIS_SCALA_VERSION package
