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
	import mx.graphics.IFill;
	import mx.graphics.IStroke;
	import mx.graphics.SolidColor;
	import mx.graphics.SolidColorStroke;
	
	import spark.components.Group;
	
	public class Map extends Group
	{
		protected var regions:Array = [];
		
		public function highlight(regionCode:String, color:uint):void
		{
			regions[regionCode].path.fill = new SolidColor(color);
		}
		
		override protected function createChildren():void
		{
			super.createChildren();
			createMap();
		}
		
		protected function get stroke():IStroke
		{
			return new SolidColorStroke(0,0.5, 0.3, false, 'none');
		}
		
		protected function get fill():IFill
		{
			return new SolidColor(0xEEEEEE);
		}
		
		protected function get highlightFill():IFill
		{
			return new SolidColor(0x547ECB);
		}
		
		protected function createMap():void
		{
			//Override in subclass
		}
		
	}
}