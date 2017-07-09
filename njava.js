"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		All rights reserved.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "njava",
			"path": "njava/njava.js",
			"file": "njava.js",
			"module": "njava",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/njava.git",
			"test": "njava-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Install java using npm.
	@end-module-documentation

	@include:
		{
			"comex": "comex",
			"gnaw": "gnaw"
		}
	@end-include
*/

const comex = require( "comex" );
const gnaw = require( "gnaw" );

const njava = function njava( ){
	try{
		comex( "sudo apt-get install -y software-properties-common debconf-utils" )
			.refresh( )
			.and( "sudo add-apt-repository -y ppa:webupd8team/java" )
			.and( "sudo apt-get update" )
			.and( `echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections` )
			.and( "sudo apt-get install -y oracle-java8-installer" )
			.execute( true, { "stdio": [ 0, 1 ] } );

		return gnaw( "which java", true );

	}catch( error ){
		comex( "sudo rm -Rfv /var/lib/dpkg/info/oracle-java8-installer*" )
			.refresh( )
			.and( "sudo apt-get -y purge oracle-java8-installer*" )
			.and( "sudo rm /etc/apt/sources.list.d/*java*" )
			.and( "sudo rm -Rfv /var/cache/oracle-jdk8-installer*" )
			.execute( true, { "stdio": [ 0, 1 ] } );

		return njava( );
	}
};

module.exports = njava;
