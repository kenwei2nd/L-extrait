# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  function rg {
  local _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin=/c/Users/kenwe/.local/bin/claude.exe
  if [[ ! -x $_cc_bin ]]; then command rg "$@"; return; fi
  if [[ -n $ZSH_VERSION ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ $BASHPID != $$ ]]; then
    exec -a rg "$_cc_bin" "$@"
  else
    (exec -a rg "$_cc_bin" "$@")
  fi
}
fi
export PATH='/c/Users/kenwe/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/kenwe/bin:/c/Users/kenwe/AppData/Local/Programs/Microsoft VS Code:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/cmd:/c/Program Files/nodejs:/c/Users/kenwe/AppData/Local/Programs/Python/Python312/Scripts:/c/Users/kenwe/AppData/Local/Programs/Python/Python312:/c/Users/kenwe/AppData/Local/Programs/Python/Launcher:/c/Users/kenwe/AppData/Local/Microsoft/WindowsApps:/c/Antigravity/bin:/c/Users/kenwe/AppData/Roaming/npm:/c/Users/kenwe/AppData/Local/Programs/Microsoft VS Code/bin:/usr/bin/vendor_perl:/usr/bin/core_perl:/c/Users/kenwe/.claude/plugins/cache/claude-plugins-official/frontend-design/unknown/bin:/c/Users/kenwe/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/bin:/c/Users/kenwe/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/bin:/c/Users/kenwe/.claude/plugins/cache/claude-plugins-official/github/unknown/bin'
