for (let w of work) {
  if (w.title.includes(".")) {
    w.title = w.title.replace(".", "")
  }
    if (w.title.includes(" ")) {
      w.title = w.title.replace(/ /g, "-")
    }
      console.log(w.title.toLowerCase())
}

