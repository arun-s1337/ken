#!/bin/bash
# Script to automatically set up local Git hooks

echo "⚙️ Setting up Git hooks..."

# Ensure hooks folder exists
mkdir -p .git-hooks

# Copy pre-commit hook
cat > .git-hooks/pre-commit <<'EOF'
#!/bin/bash
# Pre-commit hook to lowercase all file/folder names

echo "🔄 Lowercasing all filenames before commit..."

find . -depth | while read path; do
    if [[ "$path" == ./.git* ]]; then
        continue
    fi

    lower=$(echo "$path" | tr 'A-Z' 'a-z')
    if [ "$path" != "$lower" ]; then
        mkdir -p "$(dirname "$lower")" && mv "$path" "$lower"
        git add "$lower"
        echo "Renamed: $path -> $lower"
    fi
done

echo "✅ Lowercase normalization complete."
EOF

chmod +x .git-hooks/pre-commit

# Tell Git to use our hooks folder
git config core.hooksPath .git-hooks

echo "✅ Git hooks installed successfully."
