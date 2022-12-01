var express = require("express");
var router = express.Router();
var novedadesModel = require("./../models/novedadesModel");
var cloudinary = require("cloudinary").v2;
var nodemailer = require("nodemailer");

router.get("/novedades", async function (req, res, next) {
  let novedades = await novedadesModel.getNovedades();

  novedades = novedades.map((novedades) => {
    if (novedades.img_id) {
      const imagen = cloudinary.url(novedades.img_id, {
        width: 200,
        height: 200,
        crop: "fill",
      });
      return {
        ...novedades,
        imagen,
      };
    } else {
      return {
        ...novedades,
        imagen: "",
      };
    }
  });

  res.json(novedades);
});

router.post("/contacto", async (req, res) => {
  const mail = {
    to: "mariacruztubio@gmail.com",
    subject: "Contacto web",
    html: `${req.body.nombre} se contacto para solicitar información sobre los talleres, y para saber conocer la modadidad de atención.<br>
     El comentario de la consulta fue: ${req.body.mensaje} <br> E-mail: ${req.body.email} <br> Telefeno: ${req.body.telefono}`,
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);
  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

module.exports = router;
