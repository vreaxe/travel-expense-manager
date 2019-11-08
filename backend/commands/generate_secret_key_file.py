import random;

result = "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])

file = open("../secretkey.txt","w+")
file.write(result)
file.close()
