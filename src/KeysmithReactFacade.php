<?php

namespace Blaspsoft\KeysmithReact;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Blaspsoft\KeysmithReact\Skeleton\SkeletonClass
 */
class KeysmithReactFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'keysmith-react';
    }
}
