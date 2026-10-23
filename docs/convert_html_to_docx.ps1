$htmlPath = "C:\Users\fngg7\Desktop\ultrapp\informe_word.html"
$docxPath1 = "C:\Users\fngg7\Desktop\ultrapp\Informe_Tecnico_Azure_IIS_MVP.docx"
$docxPath2 = "C:\Users\fngg7\Desktop\ultrapp\smart-parking\Informe_Tecnico_Azure_IIS_MVP.docx"

try {
    Write-Host "Iniciando Microsoft Word COM..."
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = [Microsoft.Office.Interop.Word.WdAlertLevel]::wdAlertsNone

    Write-Host "Abriendo archivo HTML: $htmlPath"
    $doc = $word.Documents.Open($htmlPath, [ref]$false, [ref]$true)

    Write-Host "Guardando como DOCX: $docxPath1"
    # 16 = wdFormatXMLDocument (.docx)
    $doc.SaveAs2($docxPath1, [ref]16)
    
    Write-Host "Guardando copia en smart-parking: $docxPath2"
    $doc.SaveAs2($docxPath2, [ref]16)

    $doc.Close([ref]$false)
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()

    Write-Host "¡DOCUMENTO DOCX GENERADO EXITOSAMENTE!"
} catch {
    Write-Host "Error en la conversión a Word: $($_.Exception.Message)"
}
