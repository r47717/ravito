provider "aws" {
  profile    = var.profile
  region     = var.region
}

resource "aws_instance" "main" {
  ami           = "ami-04b9e92b5572fa0d1"
  instance_type = "t2.micro"

  key_name = aws_key_pair.mykeypair.key_name

  connection {
    type     = "ssh"
    user     = "root"
    private_key = file("~/.ssh/id_rsa")
    host     = self.id
  }

  provisioner "remote-exec" {
    inline = [
      "sudo npm -y install nodejs"
    ]
  }
}

resource "aws_eip" "ip" {
  vpc = true
  instance = aws_instance.main.id
}

resource "aws_key_pair" "mykeypair" {
  key_name = "mykey"
  public_key = file("~/.ssh/id_rsa.pub")
}