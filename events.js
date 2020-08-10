class Data {
				
	constructor() {
		// загружаем данные из локального хранилища
		this.data = this._dataload("sections, floors, apartments");
		
		this.update("#sections-test");
		
		this.matrixsort();
		
	}
	
	
	_dataload(name) {
		console.log("Модуль загрузки данных из локального хранилища v.0.1");
		name = Array.from( name.replace(/\s/g, "").split(",") );
		let exportData = [];
		
		/*
		console.log("Список загружаемых массивов:");
		console.table(name);
		*/
		
		$.each(name, function(index, value) {
			try {
				//console.log("Загружаю " + value + " из локального хранилища");
				let arr = JSON.parse( localStorage.getItem(value) );
				
				if( !Array.isArray(arr) ) {
					console.log("Массива " + value + " в локальном хранилище не обнаружено. Создаем пустой");
					arr = [];
				}
				
				exportData[value] = arr;
				//console.log("Массив " + value + " загружен");
			} catch(e) {
				console.log(e);
			}
		});
		
		return exportData;
		
	}
	
	
	
	
	
/* ========================================
	РАЗДЕЛ 1: СЕКЦИИ
======================================== */
	
	// Добавление секции
	sectionAdd() {
					
		try {
			let lastElem;
			let index = this.data.sections.length - 1;
							
			if (index > -1) {
				lastElem = this.data.sections[index].sectionId;
			} else {
				lastElem = 0;
			}
							
			let setData = {
				sectionId: lastElem + 1
			};
							
			this.data.sections.push(setData);
			this._updateData(this.data.sections);
			this.update("#sections-test");
											
			// для отладки
			console.log("Данные добавлены (index " + (index + 1) + ")");
						
		} catch (e) {
			console.log(e);
		}
						
	};
	
	
	// Удаление секции
	sectionRemove(element) {
		let id = element.val();
		let result = confirm("Удалить секцию?");
		
		if (result) {
			this.data.sections.splice(id, 1);
			this._updateData(this.data.sections);
			this.update("#sections-test");
							
			//console.table(this.data["sect"]);
			console.log("Данные удалены (index " + id + ")");
		}
	}
	
/* ========================================
	РАЗДЕЛ 2: ЭТАЖИ
======================================== */	
	
	// Добавление этажа
	floorAdd(element) {
		let array = element.serializeArray();
		
		let data = {
			section: parseInt(array[0].value),
			floor: parseInt(array[1].value),
			repeat: parseInt(array[2].value)
		}
		
		try {
			
			this.data.floors.push(data);
			localStorage.setItem("floors", JSON.stringify(this.data.floors));
			this.update("#sections-test");
			
		} catch(e) {
			console.log(e);
		}
	}
	
	// Удаление этажа
	removeFloor(element) {
		let id = element.val();
		let result = confirm("Удалить этаж?");
		
		if (result) {
			this.data.floors.splice(id, 1);
			//this._updateData(this.data.sections);
			localStorage.setItem("floors", JSON.stringify(this.data.floors));
			this.update("#sections-test");	
		}
	}
	
/* ========================================
	РАЗДЕЛ 3: КВАРТИРЫ
======================================== */		

	// Открытие формы добавления квартиры
	openApartmentWindow(element) {
		let data = element.serializeArray();
					
		let arr = {
			section: parseInt(data[0].value),
			floor: parseInt(data[1].value),
			repeat: parseInt(data[2].value)
		};
					
		let parent = $("#jsCreateFloor");
		let value = {
			section: parent.find("#floor-section"),
			floor: parent.find("#floor-level"),
			floorRepeat: parent.find("#floor-repeat"),
			floorVisual: parent.find("#floor-level-visual")
		};
					
		value.section.attr("value", arr.section);
		value.floor.attr("value", arr.floor);
		value.floorRepeat.attr("value", arr.repeat);
					
		if(arr.repeat > 1) {
			value.floorVisual.attr("value", arr.floor + "-" + (arr.floor + arr.repeat - 1));
		} else {
			value.floorVisual.attr("value", arr.floor);
		}
					
		parent.modal()
	}
	
	// Добавление квартиры
	addApartment(element) {
		let elem = element.serializeArray();
					
		let arr = {
			section: parseInt(elem[0].value),
			floor: parseInt(elem[1].value),
			repeat: parseInt(elem[2].value),
			type: elem[3].value,
			square: parseFloat(elem[4].value)
			//unique: elem[0].value
		};
					
		try {		
			this.data.apartments.push(arr);
			localStorage.setItem("apartments", JSON.stringify(this.data.apartments));
			this.update("#sections-test");				
		} catch(e) {			
			console.log(e);			
		}
	}
	
	// Удаление квартиры
	removeApartment(element) {
		let id = element.val();
		let result = confirm("Удалить квартиру?");
		
		if (result) {
			this.data.apartments.splice(id, 1);
			//this._updateData(this.data.sections);
			localStorage.setItem("apartments", JSON.stringify(this.data.apartments));
			this.update("#sections-test");	
		}
	}








					
	_updateData(data) {
		//console.log("Обновление данных в локальном хранилище");
		localStorage.setItem("sections", JSON.stringify(data));
		//console.log("Данные в локальном хранилище обновлены");
	}
					
	// обновляем элементы на странице в соответствии с данными из хранилища
	update(elem) {
					
		if (elem) {
						
			$(elem).empty();
			
			$.each( this.data.sections, function(i, value) {				
				$(elem).append(`
				<div>
					Секция ${value.sectionId}
					<button class="btn btn-danger" name="remove-section" value="${i}">Удалить</button>
				</div>
				<table class="table sectionTable" id="sectionTable-${value.sectionId}">
					<thead>
						<th width="10%">Этаж</th>
						<th>Квартиры</th>
					</thead>
					<tbody>
					</tbody>
				</table>
				<div>
					<form class="addFloor">
						<input type="hidden" name="section" value="${value.sectionId}">
						<input type="number" name="number" placeholder="Номер этажа">
						<input type="number" name="repeat" placeholder="Сколько раз повторяется">
						<button class="btn btn-primary" type="submit">+ этаж</button>
					</form>
				</div><br><br>`);
			});
			
			
			$.each(this.data.floors, function(index, value) {
				let floor = value.floor;
				if (value.repeat > 1) {
					floor = value.floor + "-" + (value.floor + value.repeat - 1);
				} else {
						floor = value.floor;
				}
				let elem = $("#sectionTable-" + value.section).find("tbody").append(`
					<tr class="tableFloor" id="tableFloor-${value.floor}">
						<td>
							<button class="btn btn-secondary js-floor" value="${index}">${floor}</button>
						</td>
						<td>
							<form style="display: inline;">
								<button class="btn btn-success" type="submit">+ квартира</button>
								<input type="hidden" name="section" value="${value.section}">
								<input type="hidden" name="floor" value="${value.floor}">
								<input type="hidden" name="repeat" value="${value.repeat}">
							</form>
						</td>
					</tr>
				`);
			});
	
	
			$.each(this.data.apartments, function(index, value) {	
				let sectionId = $("#sectionTable-" + value.section);
				let floorId = sectionId.find("#tableFloor-" + value.floor + " td:nth-child(2)");
				floorId.append(`<button class="btn btn-light js-apartment" value="${index}">
					${value.type} ${value.square}
				</span>`);	
			});				
		}
			
		console.log("Данные на экране обновлены");
	}
		


		

	matrixsort() {
		this.matrix = [
		  // 0С 1С 2С 3С 4С
			[0, 0, 0, 0, 0,], // XS
			[0, 0, 0, 0, 0,], // S
			[0, 0, 0, 0, 0,], // M
			[0, 0, 0, 0, 0,], // L
			[0, 0, 0, 0, 0,] // XL
		];
		
		this.matrix1 = [
		  // 0С 1С 2С 3С 4С
			[0, 0, 0, 0, 0,], // XS
			[0, 0, 0, 0, 0,], // S
			[0, 0, 0, 0, 0,], // M
			[0, 0, 0, 0, 0,], // L
			[0, 0, 0, 0, 0,] // XL
		];
		
		console.table(this.data.apartments);
		
		for (let index = 0; index < this.data.apartments.length; index++) {
			let value = this.data.apartments[index];
			
			// получаем X координату
			let X = this.getCoordinate( "X", this.checkSquare(value.type, value.square) );
			
			// получаем Y координату
			let Y = this.getCoordinate( "Y", value.type );
			
			console.log("Координаты квартиры (" + X + "; " + Y + ")");
			
			if (value.repeat > 0) {
				this.matrix[X][Y] += value.repeat;
				
				this.matrix1[X][Y] += Math.round(value.square * value.repeat);
			} else {
				this.matrix[X][Y] += 1;
				
				this.matrix1[X][Y] += Math.round(value.square);
			}
		}
		

		
		this.matrixDraw("#flatography tbody", this.matrix);
		this.matrixDraw("#flatography-square tbody", this.matrix1);
		
	}
	
	matrixDraw(elem, matrix) {
		$.each(matrix, function(index, value) {
			
			let element = $(elem).find("tr:nth-child(" + (index + 1) + ")");
			
			
			$.each(value, function(index2, value2) {
				element.append(`<td>${value2}</td>`);
			});
			
			
		});
	}
	
	checkSquare(tp, sqr) {
			let sqrRange = [
				["0С", [20, 25, 30, 40, 55]],
				["1С", [35, 40, 55, 70, 80]],
				["2С", [50, 60, 75, 90, 110]],
				["3С", [65, 80, 95, 110, 130]],
				["4С", [90, 100, 115, 130, 200]],
			];
			
			let sqrRange2 = ["XS", "S", "M", "L", "XL"];
			
			// ищем нужную строчку в массиве по классу квартиру
			for (let index = 0; index < sqrRange.length; index++) {
				let value = sqrRange[index];
				
				if ( tp == value[0] ) {
					//console.table (value[1]);
					
					// ищем нужный класс квартиры
					for (let index2 = 0; index2 < value[1].length; index2++) {
						let value2 = value[1][index2];
						
						//console.log (value2);
						
						if (sqr <= value2) {
							return sqrRange2[index2];
							break;
						}
					}	
					
				}
			}
	}
	
	getCoordinate(typeOf, value) {
		if (typeOf == "X") {
			let array = ["XS", "S", "M", "L", "XL"];
			return array.indexOf(value);
		}
		
		if (typeOf == "Y") {
			let array = ["0С", "1С", "2С", "3С", "4С"];
			return array.indexOf(value);
		}
	}
	
	

	
	
	
	
				
}