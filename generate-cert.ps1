# Generate self-signed certificate for development
$cert = New-SelfSignedCertificate -DnsName "localhost", "127.0.0.1", "YOUR_IP_ADDRESS" -CertStoreLocation "cert:\CurrentUser\My" -KeyUsage KeyEncipherment,DigitalSignature -KeyLength 2048 -NotAfter (Get-Date).AddYears(1)

# Export certificate and private key
$password = ConvertTo-SecureString -String "password" -Force -AsPlainText
$certPath = ".\certificates\cert.pfx"
Export-PfxCertificate -Cert $cert -FilePath $certPath -Password $password

# Convert to PEM format (we'll do this manually)
Write-Host "Certificate created at: $certPath"
Write-Host "Thumbprint: $($cert.Thumbprint)"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Install the certificate in your browser's trusted root certificates"
Write-Host "2. Use the HTTPS server script"
