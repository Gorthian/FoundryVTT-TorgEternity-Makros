/*
	Autor			    : Gorthian
	Voraussetzung	: Modul "Party Ressources"                  
*/

new Dialog({
    title: "Frömmigkeitswert anpassen",
    content: `
		<form>
		<div class="form-group">
			<label for="action">Aktion</label>
			<input type="radio" id="action_modify" name="action" value="modify" checked>
			<label for="action_modify">Ändern</label>
			<input type="radio" id="action_set" name="action" value="set">
			<label for="action_set">Setzen</label>
		</div>
        <div class="form-group">
          <label for="character">Charakter wählen</label>
          <select id="character" name="character" style="background-color:white;">
            <option value="__all__">Alle</option>
            <option value="kamis-fr-mmigkeitswert">Kami</option>
            <option value="katsuyas-fr-mmigkeitswert">Katsuya</option>
            <option value="louis-fr-mmigkeitswert">Loui</option>
            <option value="michails-fr-mmigkeitswert">Michail</option>
          </select>
		</div>
		<div class="form-group">
		  <label for="modify">Wert ändern um/Setzen auf</label>
          <input type="number" name="modify" id="modify" value=0></input>
        </div>
		</form>
    `,
	buttons:{
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Wert anpassen`,
            callback: () => {
				let apiID=document.getElementById('character').value;
				let modify=document.getElementById('modify').value;
				let action=document.querySelector('input[name="action"]:checked').value;

				console.log (apiID);
				console.log (modify);
				console.log (action);
				
				if (apiID === "__all__") {
					if (action === "set") {
						window.pr.api.set("kamis-fr-mmigkeitswert", modify*1);
						window.pr.api.set("katsuyas-fr-mmigkeitswert", modify*1);
						window.pr.api.set("louis-fr-mmigkeitswert", modify*1);
						window.pr.api.set("michails-fr-mmigkeitswert", modify*1);
					} else if (modify >= 0) {
						window.pr.api.increment("kamis-fr-mmigkeitswert", modify*1);
						window.pr.api.increment("katsuyas-fr-mmigkeitswert", modify*1);
						window.pr.api.increment("louis-fr-mmigkeitswert", modify*1);
						window.pr.api.increment("michails-fr-mmigkeitswert", modify*1);
					} else {
						window.pr.api.decrement("kamis-fr-mmigkeitswert", modify*(-1));
						window.pr.api.decrement("katsuyas-fr-mmigkeitswert", modify*(-1));
						window.pr.api.decrement("louis-fr-mmigkeitswert", modify*(-1));
						window.pr.api.decrement("michails-fr-mmigkeitswert", modify*(-1));
					}
				} else {				
					if (action === "set") {
						window.pr.api.set(apiID, modify*1);
					} else if (modify >= 0) {
						window.pr.api.increment(apiID, modify*1);
					} else {
						window.pr.api.decrement(apiID, modify*(-1));
					}
				}				
            }
        }},
    default:'yes',	
}).render(true);
