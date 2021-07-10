#!/bin/bash

# Functions
function f_displayHelp() {
    echo "Usage: $0 -flag(s) command";
    echo "i.e; $0 -vd serve    Would display the version before starting the server"
    echo ""
    echo "Optional flags:";
    echo "-d | --dev | --developer      Development environment"
    echo "-p | --prod | --production    Production environment"
    echo "-h | --help                   Display this help information"
    echo "-v | --version                Display the API version"
    echo ""
    echo "Commands:"
    echo "serve       Start the server normally"
    echo "start       Same as serve"
    echo ""
    echo "Press CTRL+C to stop the server"
    echo ""
}
function f_startServer() {
  local environment="$1"
  local command="$2"

  # Abort on unknown command
  if [ $command != "serve" ]; then
    echo "Environment \"--$environment\" expected \"serve\"; got \"$command\"" >&2
    exit 1;
  fi

  # Run the server
  case $environment in
    'dev'|'developer')
      npm run serve-dev
      exit 1
    ;;
    'prod'|'production')
      npm run serve
    ;;
    *)
      echo 'f_startServer requires an argument...' >&2
      exit 1
    ;;
  esac
}


# Variables
version=0.0.1


# Cases
TEMP=$(getopt -o 'd:p:vh' --long 'dev:,developer:,prod:,production:,version,help' -n 'example.bash' -- "$@")

if [ $? -ne 0 ]; then
	echo 'Terminating...' >&2
	exit 1
fi

# Note the quotes around "$TEMP": they are essential!
eval set -- "$TEMP"
unset TEMP

while true; do
	case "$1" in
		'-d'|'--dev'|'--developer')
      f_startServer "developer" $2
			shift 2
			continue
		;;
		'-p'|'--prod'|'--production')
      f_startServer "production" $2
			shift 2
			continue
		;;
		'-v'|'--version')
			echo "API version '$version'"
			shift
			continue
		;;
		'-h'|'--help')
      f_displayHelp
			shift
			continue
		;;
		'--')
			shift
			break
		;;
		*)
			echo 'Internal error!' >&2
			exit 1
		;;
	esac
done

#echo 'Remaining arguments:'
#for arg; do
#	echo "--> '$arg'"
#done



# Consider optional flags
#if [[ -n $flags ]]; then
#  if [[ $flags =~ ^-?-[a-z] ]]; then # Argument starts with a hyphen
#    # Handle all provided flags
#    while [[ $1 != "" ]]; do
#    echo "While:" $1;
#      case $flags in
#        -d|--dev|--development)   env="development"; echo $flags ;;
#        -v|--version)             echo $version; exit 1 ;;
#        -a)                       echo "" ;;
#        *)                        echo "No flags left" $flags; exit 1 ;;
#      esac
#      shift; # Shifts arguments
#    done
#  fi
#fi

# Server functionallity
#case $arguments in
#  serve|start)
#    # Dev check
#    if [[ $flags == "-d" ]]; then
#      echo "Starting server (dev)...";
#      npm run serve-dev
#    else
#      echo "Starting server...";
#      npm run serve
#    fi
#  ;;
#  help)
#    echo "1";
#  ;;
#  test)
#    echo "2";
#  ;;
#  *)
#    f_displayHelp
#  ;;
#esac