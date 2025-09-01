export function download(url: string, filename: string) {
  fetch(url, {mode: "cors"})
    .then(r => r.blob())
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    })
    .catch(() => window.open(url, "_blank", "noopener,noreferrer"));
}
