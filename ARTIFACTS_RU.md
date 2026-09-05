Краткое описание артефактов, сгенерированных после прогона тестов

Пути в проекте:

- HTML-отчёт: playwright-report\index.html
  - Откройте его командой: npx playwright show-report

- Метод для просмотра артефактов (PowerShell):

  Get-ChildItem .\playwright-report -Recurse | Select-Object FullName
  Get-ChildItem .\test-results -Recurse | Select-Object FullName, Length

- test-results\ - содержит:
  - .last-run.json — информация о последнем запуске
  - подпапки для каждого теста с именем-идентификатором, внутри — скриншоты, видео (.webm), trace.zip

