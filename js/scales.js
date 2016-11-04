            function disegnaTasto(entry) {
                entry.disegna();
            }

            function tastiera(numeroTasti, canvas) {
                this.numeroTasti = numeroTasti;
                this.scala = canvas.width;
                this.canvas = canvas;
                
                // un'approssimazione della costante
                // della progressione temperata
                this.ratio = 0.94;
                this.tasti = new Array();
                
                this.marcaScala = function(scala, inizio) {
                    var pos = inizio;
                    var corda = 5;
                    var grado = 0;

                    do {
                        if (grado == 0) {
                            this.tasti[pos].marca(corda, '#ff3030');
                        } else {
                            this.tasti[pos].marca(corda);
                        }
                        pos += scala[grado];
                        grado++;
                        if (grado >= scala.length) {
                            grado = 0;
                        }
                        if (pos > inizio + 3) {
                            pos -= (corda == 2 ? 4 : 5);
                            corda--;
                        }
                    } while(corda >= 0);
                }

                // inizializza i tasti
                var da = this.scala;
                for (i = 0; i < numeroTasti; i++) {
                    var larghezza = da * (1 - this.ratio);
                    this.tasti[i] = new tasto(this.scala - da, larghezza, this.canvas);
                    if ([3, 5, 7, 9, 12, 15, 17, 19, 21].indexOf(i + 1) >= 0) {
                        this.tasti[i].pallino = true;
                    } else {
                        this.tasti[i].pallino = false;
                    }
                    da -= larghezza;
                }

                this.tasti.forEach(disegnaTasto);
            }
            
            function tasto(inizio, larghezza, canvas, pallino) {
                this.inizio= inizio;
                this.larghezza = larghezza;
                this.canvas = canvas;
                this.pallino = pallino;
                
                var ctx = canvas.getContext('2d');
                
                this.disegna = function() {
                    ctx.fillStyle = '#404040'; //"#807050";
                    ctx.fillRect(inizio, 0, larghezza, canvas.height);
                    // il pallino
                    if (this.pallino == true) {
                        ctx.fillStyle = "#808080";
                        ctx.arc(inizio + larghezza / 2, canvas.height / 2, 4, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                    // il capotasto
                    ctx.fillStyle = "#ffffd0";
                    ctx.fillRect(inizio + larghezza - 3, 0, 3, canvas.height);
                    // le corde
                    ctx.fillStyle = "#d0d0d0";
                    for (corda = 0; corda < 6; corda++) {
                        ctx.fillRect(inizio, this.trovaCorda(corda), larghezza, 2);
                    }
                }
                
                this.marca = function(corda, colore) {
                    ctx.beginPath();
                    colore = (typeof colore === "undefined") ? "#a0a0ff" : colore;
                    ctx.fillStyle = colore;
                    ctx.arc(inizio + larghezza / 2, this.trovaCorda(corda) , 7, 0, 2 * Math.PI);
                    ctx.fill();
                }
                
                this.trovaCorda = function(numero) {
                    return 5 + 15 * numero;
                }
            }