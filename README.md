# IMT-TB reTHINK Testbed
![](./docs/Testbed-Design/figures/reThink%20banner.jpg)
This repo if forked from reThink Github project and customized by IMT-TB. This document instructs you to set up the IMT-TB version of reThink testbed on Ubuntu. For more information about reThink project please refer to: https://rethink-project.eu/.
This testbed is currently (2017/02) configured for the development based on NodeJS messaging node.
## Prerequisites

- System OS: Ubuntu: 64-bit, 14.04 Trusty or later.
- A pre-installation of Node.JS(6.0 or later) is mandatory and Java(1.7.0 or later) is highly recommended.

## Install Docker

1. Install Docker-Engine on Ubuntu following the link: https://docs.docker.com/engine/installation/linux/ubuntulinux/.
2. Install Docker-Compose via the link: https://docs.docker.com/compose/install/.

## Install Testbed
0. Create a project folder **reThink/** under your **~** or **/home/[your_username]/** directory (otherwise you would need to modify the path to your own in the docker-compose configuration file):

    ```
    $ mkdir reThink
    ```
    
1. Git clone this repo:

    ```
    $ git clone git@github.com:Heriam/reThink-testbed.git
    ```
    
2. Go to reTHINK H2020 Project GitHub page: https://github.com/reTHINK-project/, and you will see a list
   of project repositories. Find the “dev-hyperty-toolkit” and “dev-hyperty” repositories, and git clone them into the **PT-node** directory:
   
   ```
   $ cd reThink-testbed/nodes/PT-node/
   $ git clone -b develop git@github.com:reTHINK-project/dev-hyperty-toolkit.git
   $ git clone -b develop git@github.com:reTHINK-project/dev-hyperty.git
   ```
   
3. The testbed is currently(2017/02) used and configured for the development based on NodeJS messaging node. So, git clone the NodeJS messaging node under the **reThink/** project folder:
    ```
    $ cd ~/reThink
    $ git clone git@github.com:Heriam/dev-msg-node-nodejs.git
    ```
    Run the following command to support local development environment:
    ```
    $ npm run init-setup
    ```    
    After running successfully this command you will have 2 folders (node_modules and vendor), these folders are excluded from the commit process, and are only for development.
    
    In order to build dev-msg-node-nodejs you must have docker running. Otherwise docker can be installed from [docker installation](https://docs.docker.com/). After having intsalled correctly docker, run the command:
    ```
    $ docker build -t msg-node-nodejs .
    ```
    
    **Note** that if you meet with some permission problems, try to run the command with **sudo** or as root user.
    
4. Add following lines into **/etc/hosts** file:
    
    ```
    # reThink
    172.19.0.2        msg-node.hjiang-rethink.com
    172.19.0.4        registry.hjiang-rethink.com
    172.19.0.8        catalogue.hjiang-rethink.com
    172.19.0.32       hjiang-rethink.com
    ```

## Run and stop the Testbed

 - Use commands `docker-compose up` or `docker-compose down` to start or stop all the services of the testbed under the **reThink-testbed/nodes/PT-node/development** directory.
 
 
## Others

 - Reference: https://github.com/Heriam/reThink-testbed/tree/dev-tb/docs/reThink_Testbed.pdf