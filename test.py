import sys

def question(q):
  return f"The question is the answer: {q}."

secret = 4

if __name__ == "__main__":
    export_name = sys.argv[1]
    args = sys.argv[2:]

    if export_name == 'secret':
        print(secret)
    elif export_name == 'question' and args:
        print(question(*args))
