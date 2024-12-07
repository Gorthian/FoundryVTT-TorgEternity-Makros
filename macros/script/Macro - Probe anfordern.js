/*
	Autor		: Gorthian
	Voraussetzung	: Modul "Requestor" von Zhell
*/

new Dialog({
    title:'Probe anfordern',
    content:`
	<script>
	function skillChanged(skill) {
		if (["energyWeapons","fireCombat","meleeWeapons","missileWeapons","heavyWeapons","unarmedCombat","dodge","stealth","landVehicles","airVehicles","beastRiding","lockpicking","waterVehicles"].includes(skill)) {
			attribute = "dexterity";
		} else if (["intimidation","apportation","conjuration","faith","kinesis","reality","willpower"].includes(skill)) {
			attribute = "spirit";
		} else if (["trick","profession","evidenceAnalysis","computers","firstAid","find","scholar","medicine","precognition","language","tracking","survival","alteration","divination","science"].includes(skill)) {
			attribute = "mind";
		} else if (["taunt","streetwise","telepathy","persuasion"].includes(skill)) {
			attribute = "charisma";
		} else {
			attribute = "strength";
		}
		
		document.getElementById('attribute').value = attribute;
	}
	</script>
	<form>
            <div class="form-group">
                <label>Fertigkeit</label>
                <select name="skill" id="skill" onChange="skillChanged(this.value);">
		    <option value="">--- ANDERE ---</option>
                    <option value="apportation">Apportation</option>
                    <option value="dodge">Ausweichen</option>
                    <option value="profession">Beruf</option>
                    <option value="conjuration">Beschwörung</option>
                    <option value="evidenceAnalysis">Beweisanalyse</option>
                    <option value="computers">Computer</option>
                    <option value="firstAid">Erste Hilfe</option>
                    <option value="find">Finden</option>
                    <option value="streetwise">Gassenwissen</option>
                    <option value="scholar">Gelehrsamkeit</option>
                    <option value="faith">Glauben</option>
                    <option value="stealth">Heimlichkeit</option>
                    <option value="kinesis">Kinese</option>
                    <option value="landVehicles">Landfahrzeuge</option>
                    <option value="airVehicles">Luftfahrzeuge</option>
                    <option value="medicine">Medizin</option>
                    <option value="precognition">Präkognition</option>
                    <option value="reality">Realität</option>
                    <option value="beastRiding">Reiten</option>
                    <option value="lockpicking">Schlossknacken</option>
                    <option value="language">Sprache</option>
                    <option value="tracking">Spurenlesen</option>
                    <option value="telepathy">Telepatie</option>
                    <option value="survival">Überlebenskunst</option>
                    <option value="persuasion">Überreden</option>
                    <option value="alteration">Verwandlung</option>
                    <option value="divination">Wahrsagung</option>
                    <option value="waterVehicles">Wasserfahrzeuge</option>
                    <option value="willpower">Willenskraft</option>
                    <option value="science">Wissenschaft</option>
                    <option value="">--- KAMPF ---</option>
                    <option value="energyWeapons">Energiewaffen</option>
                    <option value="fireCombat">Feuerwaffen</option>
                    <option value="meleeWeapons">Nahkampfwaffen</option>
                    <option value="missileWeapons">Projektilwaffen</option>
                    <option value="heavyWeapons">Schwere Waffen</option>
                    <option value="unarmedCombat">Waffenloser Kampf</option>
                    <option value="">--- INTERAKTION ---</option>
                    <option value="intimidation">Einschüchtern</option>
                    <option value="maneuver">Manövrieren</option>
                    <option value="trick">Tricksen</option>
                    <option value="taunt">Verspotten</option>                    
                </select>
	</div><div class="form-group">
		<label>Attribute</label>
                <select name="attribute" id="attribute">
                    <option value="charisma">Charisma</option>
                    <option value="dexterity">Geschicklichkeit</option>
                    <option value="mind">Verstand</option>
                    <option value="spirit">Geist</option>
                    <option value="strength">Stärke</option>
                </select>
	</div><div class="form-group">
                <label>Schwierigkeit</label>
                <select name="difficulty" id="difficulty">
                    <option value="veryEasy">Sehr leicht</option>
                    <option value="easy">Leicht</option>
                    <option value="standard" SELECTED>Standard</option>
                    <option value="challgening">Anspruchsvoll</option>
                    <option value="hard">Schwer</option>
                    <option value="veryHard">Sehr Schwer</option>
                    <option value="heroic">Heldenhaft</option>
                    <option value="nearImpossible">Fast Unmöglich</option>
                </select>
	</div>
</form>`,
    buttons:{
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Probe anfordern`,
            callback: () => {
		var skill = document.getElementById('skill');
		var skill_value = skill.value;
		var skill_text = skill.options[skill.selectedIndex].text;
		var attribute = document.getElementById('attribute');
		var attribute_value = attribute.value;
		var attribute_text = attribute.options[attribute.selectedIndex].text;
		var difficulty = document.getElementById('difficulty');
		var difficulty_value = difficulty.value;
		var difficulty_text = difficulty.options[difficulty.selectedIndex].text;
		Requestor.request({
			img:"icons/svg/d20.svg",
			title:"Probe angefordert",
			description: skill_text+" ("+attribute_text+") <br/> Schwierigkeit: "+difficulty_text,
			buttonData: [{
				scope: {
					skill: skill_value,
					attribute: attribute_value,
					difficulty: difficulty_value
				},
				label: "Probe ausführen",
				command: async function(){
					console.log(skill + " " +attribute+ " " + difficulty);
      					return game.torgeternity.rollSkillMacro(skill, attribute, false, difficulty);
   				}
  			}]
		});
            }
        }},
    default:'yes',
  }).render(true);