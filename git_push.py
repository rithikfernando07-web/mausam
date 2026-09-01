import os
import subprocess

git_exe = r"C:\Program Files\Git\cmd\git.exe"
repo_dir = r"C:\Users\senth\.gemini\antigravity-ide\scratch\mausam"

def run_cmd(args):
    print("Running:", " ".join(args))
    res = subprocess.run(args, cwd=repo_dir, capture_output=True, text=True)
    if res.stdout:
        print("STDOUT:", res.stdout.strip())
    if res.stderr:
        print("STDERR:", res.stderr.strip())
    return res.returncode

print("=== Starting Git Setup and Push ===")
run_cmd([git_exe, "init"])
run_cmd([git_exe, "config", "user.name", "rithikfernando07-web"])
run_cmd([git_exe, "config", "user.email", "rithikfernando07@gmail.com"])
run_cmd([git_exe, "add", "."])
run_cmd([git_exe, "commit", "-m", "feat: complete personalized Mausam weather mobile application"])
run_cmd([git_exe, "branch", "-M", "main"])
run_cmd([git_exe, "remote", "remove", "origin"])
run_cmd([git_exe, "remote", "add", "origin", "https://github.com/rithikfernando07-web/mausam.git"])
rc = run_cmd([git_exe, "push", "-u", "origin", "main"])
print(f"=== Push Completed with code {rc} ===")
