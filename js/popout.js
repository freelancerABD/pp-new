function openModalWindow() {
	      var modalWindow = window.open("popout.html", "_blank", "width=500,height=600,left=400,top=60;");
/*	      modalWindow.document.write(`
	        <html>
	          <head>
	            <title>popout damge counter</title>
	            <link rel="stylesheet" type="text/css" href="normalize.css">
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
	<script type="text/javascript"  src="js/prefixfree.min.js"></script>
	<script type="text/javascript"  src="js/less.min.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

	<script>
		$(document).ready(function(){

			//DAMAGE COUNTER
			$.getJSON("ships.json",function(data){
				ships=data;
			});

			// Copy Score and SF Rows to Clipboard
			$("#copyBoth").click(function(e) {
				var score = $("#score").text().trim();
				var sfRows = $("#rows").text().trim();
				var textToCopy = "Score: " + score + "\n SF Rows: " + sfRows;

				var dummyTextArea = document.createElement("textarea");
				dummyTextArea.value = textToCopy;
				document.body.appendChild(dummyTextArea);
				dummyTextArea.select();
				document.execCommand("copy");
				document.body.removeChild(dummyTextArea);

			});
			
			// Copy Score and SF Rows to Clipboard
			$("#copyScore").click(function(e) {
				var score = $("#score").text().trim();
				var textToCopy = "Score: " + score;

				var dummyTextArea = document.createElement("textarea");
				dummyTextArea.value = textToCopy;
				document.body.appendChild(dummyTextArea);
				dummyTextArea.select();
				document.execCommand("copy");
				document.body.removeChild(dummyTextArea);

			});

			//INIT US
			ourShip=$("div.own.ship");
			ourShipPic=$(ourShip).children("div.shipPic");
			ourShipType="sloop";
			ourShipSize="small";
			ourShipShots="small";
			ourShipDamage=1;
			ourSFHP=6;
			ourHP=10;
			ourRam=0.5;
			ourShipSelector=$("select[name='ourShip']");
			ourShipSelector.change(function(){
				ourShipType=$(ourShipSelector).val();
				ourShipPic.css("background-image","url('ships/"+ourShipType+".png')");
				updateOurShip(ourShipType);
			});

			//INIT THEM
			theirShip=$("div.opponent.ship");
			theirShipPic=$(theirShip).children("div.shipPic");
			theirShipType="sloop";
			theirShipSize="small";
			theirShipShots="small";
			theirShipDamage=1;
			theirSFHP=6;
			theirHP=10;
			theirRam=0.5;
			theirShipSelector=$("select[name='theirShip']");
			theirShipSelector.change(function(){
				theirShipType=$(theirShipSelector).val();
				theirShipPic.css("background-image","url('ships/"+theirShipType+".png')");
				updateTheirShip(theirShipType);
			});

			//RESET SCORES
			ourScore=0;
			theirScore=0;
			ourRows=0;
			theirRows=0;

			//WE GOT SHOT
			$("button[name='weGotHit']").click(function(e){
				ourHP=ourHP-theirShipDamage;
				ourSFHP=ourSFHP-theirShipDamage;
				ownHealth=roundNumber(ourSFHP/theirShipDamage,2);
				ownSinkHealth=roundNumber(ourHP/theirShipDamage,2);
				if(ownHealth<=0) ownHealth="Maxed";
				if(ownSinkHealth<=0) ownSinkHealth="Sunk";
				$("#ownHealth").text(ownHealth);
				$("#ownSinkHealth").text(ownSinkHealth);
				theirScore++;
				if(ownHealth=="Maxed") $("#theirScore").text("Max");
				else $("#theirScore").text(theirScore);
				SFRows=roundNumber(((ships[ourShipType].sf)-ourSFHP)/(ships[ourShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#ourRows").text(SFRows);
			});

			//WE HIT THE ROCKS
			$("button[name='weHitRocks']").click(function(e){
				rockDamage=ships[ourShipType].sf/12;
				ourHP=ourHP-rockDamage;
				ourSFHP=ourSFHP-rockDamage;
				ownHealth=roundNumber(ourSFHP/theirShipDamage,2);
				ownSinkHealth=roundNumber(ourHP/theirShipDamage,2);
				if(ownHealth<=0) ownHealth="Maxed";
				if(ownSinkHealth<=0) ownSinkHealth="Sunk";
				$("#ownHealth").text(ownHealth);
				$("#ownSinkHealth").text(ownSinkHealth);
				SFRows=roundNumber(((ships[ourShipType].sf)-ourSFHP)/(ships[ourShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#ourRows").text(SFRows);
			});

			//THEY GOT SHOT
			$("button[name='theyGotHit']").click(function(e){
				theirHP=theirHP-ourShipDamage;
				theirSFHP=theirSFHP-ourShipDamage;
				theirHealth=roundNumber(theirSFHP/ourShipDamage,2);
				theirSinkHealth=roundNumber(theirHP/ourShipDamage,2);
				if(theirHealth<=0) theirHealth="Maxed";
				if(theirSinkHealth<=0) theirSinkHealth="Sunk";
				$("#theirHealth").text(theirHealth);
				$("#theirSinkHealth").text(theirSinkHealth);
				ourScore++;
				if(theirHealth=="Maxed") $("#ourScore").text("Max");
				else $("#ourScore").text(ourScore);
				SFRows=roundNumber(((ships[theirShipType].sf)-theirSFHP)/(ships[theirShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#theirRows").text(SFRows);
			});

			//THEY HIT THE ROCKS
			$("button[name='theyHitRocks']").click(function(e){
				rockDamage=ships[theirShipType].sf/12;
				theirHP=theirHP-rockDamage;
				theirSFHP=theirSFHP-rockDamage;
				theirHealth=roundNumber(theirSFHP/ourShipDamage,2);
				theirSinkHealth=roundNumber(theirHP/ourShipDamage,2);
				if(theirHealth<=0) theirHealth="Maxed";
				if(theirSinkHealth<=0) theirSinkHealth="Sunk";
				$("#theirHealth").text(theirHealth);
				$("#theirSinkHealth").text(theirSinkHealth);
				SFRows=roundNumber(((ships[theirShipType].sf)-theirSFHP)/(ships[theirShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#theirRows").text(SFRows);
			});

			//COLLISION
			$("button[name='collision']").click(function(e){
				ourHP=ourHP-theirRam;
				ourSFHP=ourSFHP-theirRam;
				ownHealth=roundNumber(ourSFHP/theirShipDamage,2);
				ownSinkHealth=roundNumber(ourHP/theirShipDamage,2);
				if(ownHealth<=0) ownHealth="Maxed";
				if(ownSinkHealth<=0) ownSinkHealth="Sunk";
				$("#ownHealth").text(ownHealth);
				$("#ownSinkHealth").text(ownSinkHealth);
				if(ownHealth=="Maxed") $("#theirScore").text("Max");
				else $("#theirScore").text(theirScore);
				SFRows=roundNumber(((ships[ourShipType].sf)-ourSFHP)/(ships[ourShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#ourRows").text(SFRows);

				theirHP=theirHP-ourRam;
				theirSFHP=theirSFHP-ourRam;
				theirHealth=roundNumber(theirSFHP/ourShipDamage,2);
				theirSinkHealth=roundNumber(theirHP/ourShipDamage,2);
				if(theirHealth<=0) theirHealth="Maxed";
				if(theirSinkHealth<=0) theirSinkHealth="Sunk";
				$("#theirHealth").text(theirHealth);
				$("#theirSinkHealth").text(theirSinkHealth);
				if(theirHealth=="Maxed") $("#ourScore").text("Max");
				else $("#ourScore").text(ourScore);
				SFRows=roundNumber(((ships[theirShipType].sf)-theirSFHP)/(ships[theirShipType].sf)*6,2);
				if(SFRows>=6) SFRows="Max";
				$("#theirRows").text(SFRows);
			});

			//RESET
			$("button[name='reset']").click(function(e){
				updateOurShip(ourShipType);
				updateTheirShip(theirShipType);
				ourScore=0;
				theirScore=0;
				ourRows=0;
				theirRows=0;
				$("#ourScore").text(0);
				$("#ourRows").text(0);
				$("#theirScore").text(0);
				$("#theirRows").text(0);
			});

			//YOWEB

			searchbutton=$('#yowebsearch');
			$(searchbutton).click(function(e){
				e.preventDefault();
				ocean=$("select[name='ocean']").val();
				pirate=$("input[name='searchItem']").val();
				if(pirate=='') pirate='Lexmate';
				url="https://"+ocean+".puzzlepirates.com/yoweb/pirate.wm?target="+pirate;
				window.open(url,'_blank');
			});

			yowebform=$('#yoweb > form');
			$(yowebform).submit(function(e){
				e.preventDefault();
				ocean=$("select[name='ocean']").val();
				pirate=$("input[name='searchItem']").val();
				if(pirate=='') pirate='Lexmate';
				url="https://"+ocean+".puzzlepirates.com/yoweb/pirate.wm?target="+pirate;
				window.open(url,'_blank');
			});

			//WIKI

			searchbutton=$('#wikisearch');
			$(searchbutton).click(function(e){
				e.preventDefault();
				search=$("input[name='searchItem2']").val();
				url="https://yppedia.puzzlepirates.com/Special:Search?search="+search;
				window.open(url,'_blank');
			});

			wikiform=$('#yppedia > form');
			$(wikiform).submit(function(e){
				e.preventDefault();
				search=$("input[name='searchItem2']").val();
				url="https://yppedia.puzzlepirates.com/Special:Search?search="+search;
				window.open(url,'_blank');
			});
		});

		function updateOurShip(type){
			ourShipSize=ships[type].sf;
			ourShipShots=ships[type].shots;
			ourSFHP=ships[type].sf;
			ourHP=ships[type].hp;
			ourRam=ships[type].ram;
			if(ourShipShots=='small') ourShipDamage=1;
			else if(ourShipShots=='medium') ourShipDamage=1.5;
			else if(ourShipShots=='large') ourShipDamage=2;
			ownHealth=roundNumber(ourSFHP/theirShipDamage,2);
			ownSinkHealth=roundNumber(ourHP/theirShipDamage,2);
			$("#ownHealth").text(ownHealth);
			$("#ownSinkHealth").text(ownSinkHealth);
			theirHealth=roundNumber(theirSFHP/ourShipDamage,2);
			theirSinkHealth=roundNumber(theirHP/ourShipDamage,2);
			$("#theirHealth").text(theirHealth);
			$("#theirSinkHealth").text(theirSinkHealth);
		}

		function updateTheirShip(type){
			theirShipSize=ships[type].sf;
			theirShipShots=ships[type].shots;
			theirSFHP=ships[type].sf;
			theirHP=ships[type].hp;
			theirRam=ships[type].ram;
			if(theirShipShots=='small') theirShipDamage=1;
			else if(theirShipShots=='medium') theirShipDamage=1.5;
			else if(theirShipShots=='large') theirShipDamage=2;
			ownHealth=roundNumber(ourSFHP/theirShipDamage,2);
			ownSinkHealth=roundNumber(ourHP/theirShipDamage,2);
			$("#ownHealth").text(ownHealth);
			$("#ownSinkHealth").text(ownSinkHealth);
			theirHealth=roundNumber(theirSFHP/ourShipDamage,2);
			theirSinkHealth=roundNumber(theirHP/ourShipDamage,2);
			$("#theirHealth").text(theirHealth);
			$("#theirSinkHealth").text(theirSinkHealth);
		}

		function roundNumber(num, dec) {
			var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
			return result;
		}
	</script>

	          </head>
	          <body class="dark">
	            <div class="popout container">
		            <div class="popout-content">
		            <h4 class="tp-header">Damage Counter</h4>
			        	<div class="col-lg-12">
			        		<div class="row">
			        			<div class="own ship col-6">
			        				<div class='center text-bt'>
										Our ship:
										<select name='ourShip' class="form-select">
											<option value='sloop'>Sloop</option>
											<option value='cutter'>Cutter</option>
											<option value='dhow'>Dhow</option>
											<option value='fanchuan'>Fanchuan</option>
											<option value='longship'>Longship</option>
											<option value='baghlah'>Baghlah</option>
											<option value='mb'>Merchant Brig</option>
											<option value='junk'>Junk</option>
											<option value='wb'>War Brig</option>
											<option value='mg'>Merchant Galleon</option>
											<option value='wg'>War Galleon</option>
											<option value='xebec'>Xebec</option>
											<option value='wf'>War Frigate</option>
											<option value='gf'>Grand Frigate</option>
										</select>
									</div>
									<div class='shipPic'></div>
									<div class='shipInfo'>
										Shots to max/sink: <span id='ownHealth'>6</span> / <span id='ownSinkHealth'>10</span>
									</div>
									<div class='buttons left-btn pop-btn'>
										<button name='weGotHit' class="btn">Got Shot</button>
										<button name='weHitRocks' class="btn">Hit Rocks/Edge</button>
									</div>
			        			</div>
			        			<div class="opponent col-6">
			        				<div class='center text-bt'>
										Their ship:
										<select name='theirShip' class="form-select">
											<option value='sloop'>Sloop</option>
											<option value='cutter'>Cutter</option>
											<option value='dhow'>Dhow</option>
											<option value='fanchuan'>Fanchuan</option>
											<option value='longship'>Longship</option>
											<option value='baghlah'>Baghlah</option>
											<option value='mb'>Merchant Brig</option>
											<option value='junk'>Junk</option>
											<option value='wb'>War Brig</option>
											<option value='mg'>Merchant Galleon</option>
											<option value='wg'>War Galleon</option>
											<option value='xebec'>Xebec</option>
											<option value='wf'>War Frigate</option>
											<option value='gf'>Grand Frigate</option>
										</select>
									</div>
									<div class='shipPic'></div>
									<div class='shipInfo'>
										Shots to max/sink: <span id='theirHealth'>6</span> / <span id='theirSinkHealth'>10</span>
									</div>
									<div class='buttons right-btn'>
										<button name='theyGotHit' class="btn">Got Shot</button>
										<button name='theyHitRocks' class="btn">Hit Rocks/Edge</button>
									</div>
			        			</div>
			        			<div class="mid col-12">
			        				<div style="font-size: 40px; font-weight: 700;" class="">VS</div>
									<div class='scores'>
										<div>Score: <span id='score'><span id='ourScore'>0</span> - <span id='theirScore'>0</span></span></div>
										<div>SF Rows: <span id='rows'><span id='ourRows'>0</span> - <span id='theirRows'>0</span></span></div>
										<button id="copyScore" class="btn btn-1 mt-1">Copy Score</button>
										<button id="copyBoth" class="btn btn-2 my-2">Copy Score & Rows</button>

									</div>
									<div class="btn-b">
										<button name='collision' class="btn">Collision</button>
										<button name='reset' class="btn">Reset</button>
									</div>
									<button id="closePopup" class="btn btn-c" onclick="window.close()">
										Close
									</button>
			        			</div>
			        		</div>

			        	</div>
			        	
		        	</div>
		        </div>

	          </body>
	        </html>
	      `);*/
	    }