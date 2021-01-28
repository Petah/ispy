find ./server/app -name "*.php" -print0 | xargs -0 -n1 -P8 php --syntax-check 1> /dev/null

if [ $? -ne 0 ]
then
	echo "Error: Syntax checks failed."
	exit 1
fi
