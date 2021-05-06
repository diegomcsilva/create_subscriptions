const fs = require('fs');
const path = require('path');

const PESSOAS_JSON = fs.readFileSync('pessoas.json');
const PESSOAS_FORMATADAS = JSON.parse(PESSOAS_JSON);
const ASSINATURA = './assinaturas';
const CAMINHO_ASSINATURA = path.join(__dirname, ASSINATURA);
const DATA_AGORA = new Date();
const DATA_FORMATADAS = `${DATA_AGORA.getDate()}-${DATA_AGORA.getMonth()}-${DATA_AGORA.getFullYear()}-${DATA_AGORA.getHours()}-${DATA_AGORA.getMinutes()}`;
const NOVO_CAMINHO = `${CAMINHO_ASSINATURA}_${DATA_FORMATADAS}`;

interface Informacoes {
  nome: string;
  cargo?: string;
  cel?: string;
  tel?: string;
  email?: string;
  inst?: string;
  face?: string;
  skype?: string;
}

interface myInterface  {
  nome: string;
  item: (props: Informacoes) => string;
}

const htmlAssinatura = (pessoa : Informacoes) => {
  const {    
    nome,
    cargo,
    cel,
    tel,
    email,
    inst,
    face,
    skype
  } = pessoa;

  return `
  <table>
    <tr>
      <td style="font-family:tahoma,arial,verdana; font-size:11px; text-align:center" valign="top">
        <a href="//www.irmaosgroup.com.br" target="_blank"><img src="http://www.transportesirmaos.com.br/images/logo-irmaosgroup.png?v=6522" border="0" /></a>
      </td>
      <td style="font-family:tahoma,arial,verdana; font-size:12px; padding-left: 30px;vertical-align: bottom;padding-bottom: 25px;padding-right: 74px;">
        <strong style="font-size: 16px;
        color: #5a5a58;">${nome}</strong>
        <br />
        <span 
          style="font-size: 13px;letter-spacing: 1px;color: #5a5a58;font-weight: 500;">
          ${cargo}
        </span>
        <br />
        <a href="https://api.whatsapp.com/send?phone=55
          ${cel && cel.replace('(', '').replace(')', '')}
        " target="_blank" 
        style="text-decoration: none; font-size: 13px;letter-spacing: 1px;color: #5a5a58;font-weight: 500;">
          Cel.: ${cel}
          <img src="http://www.transportesirmaos.com.br/images/copia1_whats.png" alt="Whatsapp" width="28">
        </a>
        <br />
        <a href="tel:(21) 3513 1488" target="_blank" style="text-decoration: none;font-size: 13px;letter-spacing: 1px;color: #5a5a58;font-weight: 500;">
          Tel.: ${tel}
        </a>
        <br />
        ${skype ?
        `
          <a href="https://www.skype.com/pt-br/" target="_blank"  style="text-decoration: none;font-size: 13px;letter-spacing: 1px;color: #5a5a58;font-weight: 500;display: block;">
            <img src="http://www.transportesirmaos.com.br/images/copia1_skipe.png" alt="Skipe" style="vertical-align: middle;" width="26"> 
            ${skype}
            <br />
            <br />
          </a>
          `
        : ''
      }
        <a href="mailto:${email}" target="_blank" style="text-decoration: none; font-size: 13px;letter-spacing: 1px;color: #5a5a58;font-weight: 500;">
          ${email}
        </a>
        <br />
        <a style="text-decoration: none; font-size: 13px;letter-spacing: 1px;color: #eb2227;font-weight: 500;" href="//www.irmaosgroup.com.br" target="_blank">
          www.irmaosgroup.com.br
        </a>
        <br />
      </td>
      <td style="vertical-align: bottom;padding-bottom: 25px;">
        <table>
          <tr>
            <td>
              <a href="${face || "https://www.facebook.com/"}" target="_blank"><img src="http://www.transportesirmaos.com.br/images/copia1_face.png" alt="Facebook" width="32"></a>
            </td>
            <td>
              <a href="${inst || "https://www.instagram.com/?hl=pt-br"}" target="_blank" style="margin-left: 16px;"><img src="http://www.transportesirmaos.com.br/images/copia1_insta.png" alt="Instagram" width="32"></a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `
}

const percorreListaPessoas = (item: myInterface) =>  
    fs.writeFile(
      `${NOVO_CAMINHO}/${item.nome}.html`, 
      htmlAssinatura(item), 
      (err: string) => {
      if (err) {
        console.error(err)
        return
      }
    })

const generateSubscriptions = () => {
  PESSOAS_FORMATADAS.map(percorreListaPessoas);
} 

fs.mkdirSync(NOVO_CAMINHO);

console.info('/assinaturas is created!');

// Creating
generateSubscriptions();
