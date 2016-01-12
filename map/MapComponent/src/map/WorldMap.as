////////////////////////////////////////////////////////////////////////////////
//
//  Licensed to the Apache Software Foundation (ASF) under one or more
//  contributor license agreements.  See the NOTICE file distributed with
//  this work for additional information regarding copyright ownership.
//  The ASF licenses this file to You under the Apache License, Version 2.0
//  (the "License"); you may not use this file except in compliance with
//  the License.  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//
////////////////////////////////////////////////////////////////////////////////

package map
{
	public class WorldMap extends Map
	{
		
		[Embed(source='worldmap.xml',mimeType="application/octet-stream")]
		private var mapXMLClass:Class;
		
		override protected function createMap():void
		{
			var xml:XML = new XML( new mapXMLClass );
			var paths:XMLList = xml..path;
			var countryCode:String;
			for each (var p:XML in paths) 
			{
				var data:String = p.@d.toString();
				var region:RegionContainer = new RegionContainer();
				region.mouseEnabledWhereTransparent = false;
				region.resizeMode = "scale";
				region.path.data = data;
				region.path.stroke = stroke;
				region.path.fill = fill;
				this.addElement(region);
				countryCode = p.desc["iso-a2"].toString();
				region.regionCode = countryCode;
				region.regionFullName = p.desc.name.toString();
				regions[countryCode] = region;
			}
		}
	}
}