var Toon = Backbone.Model.extend ({
	defaults: {
		name: '',
		realm: '',
		level: '',
		account: ''
	},
	
	idAttribute: 'id',
	
	initialize: function() {
		this.on('remove', function() {
			alert('toon has been deleted');
		});
	},
	
	validate: function() {
		
	}
	
});

var Toons = Backbone.Collection.extend({
	model: Toon,
	
	initialize: function() {
		this.on('add', function() {}),
		
		this.on('remove', function() {
			alert('toon has been removed from the list');
		}),
		
		this.on('change', function() {})
	}
});

var ToonView = Backbone.View.extend({
	tagName: 'li',
	
	events: {
		'click #btnEdit': 'onEditClicked',
		'click #btnDelete': 'onDeleteClicked'
	},
	
	onEditClicked: function(){
		alert('Edit has been clicked');
	},
	
	onDeleteClicked: function(){
		alert('Delete has been clicked');
		this.remove();		
	},
	
	initialize: function() {
		
	},
	
	render: function(){
		this.$el.attr('id', this.model.id)
		
		var template = $('#toonLineItem').html();
		var html = Mustache.render(template, this.model.toJSON());
		this.$el.html(html);
		
		return this;
	},
	
});

var ToonListView = Backbone.View.extend({
	tagName: 'ul', 
	
	intitialize: function() {
		this.model.on('add', this.onToonAdded, this);
		this.model.on('remove', this.onToonRemoved, this);
	},
	
	onToonAdded: function(toon){
		alert('collection view Add method');
		var toonView = new ToonView({model: toon});
		this.$el.append(ToonView.render().$el);
	},
	
	onToonRemoved: function(toon){
		alert('collection view remove method');
		this.$el.find("li#" + toon.id).remove();
	},
	
	render: function(){
		var self = this;
		
		this.model.each(function(toon) {
			var toonView = new ToonView({model: toon});
			self.$el.append(toonView.render().$el);
		});
		
		return this;
	}
});

var ToonAddView = Backbone.View.extend({
	events: {
		'click #btnAddToon': 'onAddButtonClick'
	},
	
	onAddButtonClick: function(){
		alert('i have been clicked');
	},
	
	render: function() {
		var template = $("#toonAdd").html();		
		var html = Mustache.render(template);
		this.$el.html(html);
		
		return this;
	}
});

var topView = new ToonAddView({el: '#topDiv' });
topView.render();

var toon1 = new Toon({name: 'Zajja', realm: 'Hibernia', id: 1});
var toon2 = new Toon({name: 'Reion', realm: 'Midgard', id: 2});
var toon3 = new Toon({name: 'Dort', realm: 'Midgard', id: 3});

var toons = new Toons([toon1, toon2, toon3]);

var toonListView = new ToonListView({el: '#container', model: toons});
toonListView.render();









