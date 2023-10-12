FROM ubuntu:latest

RUN apt-get -y update

# Python
# RUN apt install -y software-properties-common
# RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get -y update
RUN apt install -y python3

RUN apt-get install -y wget

## OpenPose
# RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list


RUN rm -rf ~/anaconda3/

# RUN cp -r cudnn-8.0-linux-x64-v5.1 /usr/local

WORKDIR /usr/src

# RUN wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
# RUN mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
# RUN wget https://developer.download.nvidia.com/compute/cuda/12.2.0/local_installers/cuda-repo-ubuntu2004-12-2-local_12.2.0-535.54.03-1_amd64.deb
# RUN dpkg -i cuda-repo-ubuntu2004-12-2-local_12.2.0-535.54.03-1_amd64.deb
# RUN cp /var/cuda-repo-ubuntu2004-12-2-local/cuda-*-keyring.gpg /usr/share/keyrings/
# # RUN apt-get update
# RUN apt-get -y install cuda

RUN apt-get install autoconf automake libtool curl make g++ unzip build-essential -y
# RUN git clone https://github.com/google/protobuf.git -b 3.0.x /usr/src/protobuf/
# WORKDIR /usr/src/protobuf/
# RUN git submodule update --init --recursive 
# RUN ./autogen.sh 
# RUN ./configure
# RUN make 
# RUN make check 
# RUN make install 
# RUN ldconfig

RUN apt-get install -y protobuf-compiler

# RUN wget http://developer.download.nvidia.com/compute/cuda/11.0.2/local_installers/cuda_11.0.2_450.51.05_linux.run
# COPY cuda_11.0.2_450.51.05_linux.run /usr/src/cuda_11.0.2_450.51.05_linux.run
# RUN apt-get install -y libxml2
# RUN bash cuda_11.0.2_450.51.05_linux.run
# RUN DEBIAN_FRONTEND="noninteractive" bash cuda_11.0.2_450.51.05_linux.run

RUN apt-get install -y software-properties-common

RUN wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
RUN mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
RUN wget https://developer.download.nvidia.com/compute/cuda/11.7.0/local_installers/cuda-repo-ubuntu2204-11-7-local_11.7.0-515.43.04-1_amd64.deb
RUN dpkg -i cuda-repo-ubuntu2204-11-7-local_11.7.0-515.43.04-1_amd64.deb
RUN cp /var/cuda-repo-ubuntu2204-11-7-local/cuda-*-keyring.gpg /usr/share/keyrings/
RUN apt-get update
RUN apt-get -y install cuda

RUN wget https://github.com/Kitware/CMake/releases/download/v3.15.6/cmake-3.15.6.tar.gz 
RUN tar -zxvf cmake-3.15.6.tar.gz 
WORKDIR /usr/src/cmake-3.15.6/
RUN ./bootstrap 
# RUN make -j`proc` 
RUN make -j $(nproc)
RUN make install -j`nproc`

# RUN wget https://developer.download.nvidia.com/compute/redist/cudnn/v7.6.5/cudnn-10.1-linux-x64-v7.6.5.32.tgz
# RUN mkdir /usr/local/cudnn-10.1-7.6.5.32
# RUN tar -xzf cudnn-10.1-linux-x64-v7.6.5.32.tgz -C /usr/local/cudnn-10.1-7.6.5.32 

# CUDNN_URL="http://developer.download.nvidia.com/compute/redist/cudnn/v5.1/cudnn-8.0-linux-x64-v5.1.tgz"
RUN echo "wget -c http://developer.download.nvidia.com/compute/redist/cudnn/v5.1/cudnn-8.0-linux-x64-v5.1.tgz ${WGET_VERBOSE}"
RUN wget -c http://developer.download.nvidia.com/compute/redist/cudnn/v5.1/cudnn-8.0-linux-x64-v5.1.tgz ${WGET_VERBOSE}
RUN tar -xzf cudnn-8.0-linux-x64-v5.1.tgz -C /usr/local
RUN rm cudnn-8.0-linux-x64-v5.1.tgz && ldconfig
RUN echo 'export PATH=/usr/local/cuda/bin${PATH:+:${PATH}}' >> ~/.bashrc

RUN apt install -y git

RUN git clone https://github.com/CMU-Perceptual-Computing-Lab/openpose /usr/src/openpose/
WORKDIR /usr/src/openpose/
# RUN git reset --hard 5e57c2d
RUN bash ./scripts/ubuntu/install_deps.sh

# RUN deb http://ftp2.cn.debian.org/debian sid main contrib non-free
# RUN echo "deb http://ftp2.cn.debian.org/debian sid main contrib non-free" | tee /etc/apt/sources.list.d/docker.list
# RUN apt update
# RUN apt install -y caffe-gpu

# RUN apt-get install -y libopencv-dev

RUN DEBIAN_FRONTEND="noninteractive" apt-get install --yes libopencv-dev


WORKDIR /usr/src/openpose/3rdparty/
RUN git clone https://github.com/CMU-Perceptual-Computing-Lab/caffe.git
RUN git clone https://github.com/pybind/pybind11


WORKDIR /usr/src/openpose/
RUN mkdir build/
WORKDIR /usr/src/openpose/build/

COPY models/* /usr/src/openpose/models/

RUN cmake ..
# RUN make -j`nproc`
RUN make -j $(nproc)


## DJANGO

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip 
COPY ./requirements.txt /usr/src/app
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]