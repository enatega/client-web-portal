
const {execSync} = require('child_process')

const commitMsg = execSync('cat .git/COMMIT_EDITMSG').toString().trim();
const pattern = /^(\w+) - (build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|translation|security|changeset) - .+ - v\d+$/;

if (!pattern.test(commitMsg)) {
  console.error('Invalid commit message format.');
  console.error('Format should be: branch - subject - description - version');
  process.exit(1);
}
console.log({orignal: commitMsg.match(pattern).slice(1)})
const [branch, subject, description, version] = commitMsg.match(pattern).slice(1);

// Get the last commit message
let lastCommitMsg;
try {
  lastCommitMsg = execSync('git log -1 --pretty=%B').toString().trim();
} catch (error) {
  console.error('Failed to get last commit message');
  process.exit(1);
}

if (lastCommitMsg) {
  const lastCommitPattern = /^(\w+) - (build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|translation|security|changeset) - (.+) - (v\d+)$/;
  const lastCommitMatch = lastCommitMsg.match(lastCommitPattern);

  console.log({lastCommitMatch})

  if (lastCommitMatch) {
    const [, , lastDescription, lastVersion] = lastCommitMatch.slice(1);

      console.log({lastDescription, description, lastVersion, version})
    if (description === lastDescription) {
      console.error('Description must be different from the previous commit.');
      process.exit(1);
    }

    if (version === lastVersion) {
      console.error('Version must be different from the previous commit.');
      process.exit(1);
    }
  }
}

process.exit(0);
