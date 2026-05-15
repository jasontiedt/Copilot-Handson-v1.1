#!/usr/bin/env pwsh
# Open the four seed-issues files as GitHub issues in the current repo's
# `origin` remote. Requires: `gh` authenticated. Run from repo root.

$ErrorActionPreference = 'Stop'

Push-Location (Join-Path $PSScriptRoot '..')
try {
  gh auth status *> $null
  if ($LASTEXITCODE -ne 0) {
    Write-Error "gh CLI is not authenticated. Run 'gh auth login' first."
  }

  Get-ChildItem -Path 'seed-issues' -Filter '0?-*.md' | ForEach-Object {
    $lines = Get-Content -Path $_.FullName
    $title = $lines[0] -replace '^\*\*Title:\*\* ', ''
    $bodyFile = New-TemporaryFile
    Set-Content -Path $bodyFile -Value ($lines | Select-Object -Skip 1)
    Write-Host "Opening: $title"
    gh issue create --title $title --body-file $bodyFile
    Remove-Item -Path $bodyFile
  }

  Write-Host "Done. Run 'gh issue list' to see them."
}
finally {
  Pop-Location
}
