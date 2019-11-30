import random
from os.path import dirname, abspath

directory = dirname(dirname(abspath(__file__)))
result = "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])
full_path = directory + "/secretkey.txt"

file = open(full_path, "w+")
file.write(result)
file.close()
